"use client"

import { useState, useEffect, useCallback, useRef } from "react";
import { pusherClient } from "@/lib/pusher";

// Enable pusher logging - don't include this in production

export const useBibleListening = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuote, setCurrentQuote] = useState<{ reference: string; text: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleStartRecording = useCallback(() => {
    setIsRecording(true);
    setError(null);
  }, []);

  const handleStopRecording = useCallback(() => {
    setIsRecording(false);
  }, []);


  useEffect(() => {
    pusherClient.subscribe("bible-quotes"); // Always subscribe on mount
    pusherClient.bind("new-quote", (data: { reference: string; text: string }) => {
      console.log("Received new quote:", data);
      setCurrentQuote(data);
    });;
  
    return () => {
      pusherClient.unbind("new-quote", setCurrentQuote);
      pusherClient.unsubscribe("bible-quotes");
    };
  }, []); 

  useEffect(() => {
    const cleanup = () => {
      if (mediaRecorderRef.current?.state === "recording") {
        mediaRecorderRef.current.stop();
      }
      mediaRecorderRef.current?.stream.getTracks().forEach(track => track.stop());
    };

    if (isRecording) {

      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          mediaRecorderRef.current = new MediaRecorder(stream, {
            mimeType: "audio/webm"
          });

          mediaRecorderRef.current.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
          };

          mediaRecorderRef.current.onstop = async () => {
            console.log("Stopping")
            const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
            const formData = new FormData();
            formData.append("audio", audioBlob, "recording.webm");

            console.log(formData);
            try {
              console.log("Uploading recording");
              await fetch("/api/v1/transcribe", {
                method: "POST",
                body: formData,
              });
              audioChunksRef.current = [];
            } catch (err) {
              console.error("Upload failed:", err);
            }
          };

          mediaRecorderRef.current.start(5000);
        })
        .catch(err => {
          setError("Microphone access required");
          setIsRecording(false);
          console.error("Media error:", err);
        });
    }

    return cleanup;
  }, [isRecording]);


  return {
    isRecording,
    currentQuote,
    error,
    handleStartRecording,
    handleStopRecording
  };
};