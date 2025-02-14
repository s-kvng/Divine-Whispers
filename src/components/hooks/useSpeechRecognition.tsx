/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";

// browser detection
const hasBrowser = typeof window !== "undefined";

export const useSpeechRecognition = () => {
    // State management
    const [isRecording, setIsRecording] = useState(false);
    const [error, setError] = useState("");
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
    const [isSpeechSupport, setIsSpeechSupport] = useState(false);
    const [transcript, setTranscription] = useState("");

    // Refs
    const recognitionRef = useRef<any | null>(null);

    // Check if Speech Recognition is Supported
    useEffect(() => {
        if (hasBrowser) {
            const speechSupported = "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
            setIsSpeechSupport(speechSupported);
        }
    }, []);

    // Initialize Speech Recognition
    useEffect(() => {
        if (!isSpeechSupport || !hasBrowser) return;

        const SpeechRecognition =
            (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) return;

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        let finalTranscript = "";

        recognition.onresult = (event: any) => {
            let interimTranscript = "";

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                const text = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += text + " "; // Fix concatenation issue
                } else {
                    interimTranscript += text;
                }
            }

            setTranscription(finalTranscript + interimTranscript);
        };

        recognition.onerror = (event: any) => {
            console.error("Speech recognition error:", event.error);
            setError(`Speech recognition error: ${event.error}`);
            setIsRecording(false);
        };

        recognitionRef.current = recognition;

        return () => {
            recognitionRef.current?.stop();
            if (mediaStream) {
                mediaStream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [isSpeechSupport]); // Fix dependency issue

    // Start Recording
    const handleStartRecording = async () => {
        if (!recognitionRef.current || isRecording) return;

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setMediaStream(stream);
            recognitionRef.current.start();
            setIsRecording(true);
            setTranscription("");
        } catch (error) {
            console.error("Error accessing microphone:", error);
            setError("Microphone access denied or not available");
        }
    };

    // Stop Recording
    const stopRecording = () => {
        if (recognitionRef.current && isRecording) {
            recognitionRef.current.stop();
            setIsRecording(false);
        }

        if (mediaStream) {
            mediaStream.getTracks().forEach((track) => track.stop());
            setMediaStream(null);
        }
    };

    return {
        isRecording,
        transcript,
        isSpeechSupport,
        error,
        handleStartRecording,
        stopRecording,
    };
};
