import React, {useState} from 'react'
import { Card } from './ui/card';
import { Copy, Check } from "lucide-react"
import { Button } from './ui/button';


type TranscriptionResultsProps = {
    transcript: {
      reference: string;
      text: string;
    } | null;
    isRecording: boolean;
  };

const TranscriptionResults = ({ transcript, isRecording }: TranscriptionResultsProps) => {
const [ copied , setCopied ] = useState(false);

const handleCopy = async () =>{
    await navigator.clipboard.writeText(transcript?.text || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
}


console.log(`Transcription - ${transcript}`)
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm rounded-2xl p-6 min-h-[200px] flex flex-col justify-center max-w-[25rem]">
      {transcript ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg">{transcript.reference}</h3>
            <Button variant="ghost" size="icon" onClick={handleCopy} className="shrink-0">
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <p className="text-muted-foreground text-sm mb-2">{transcript.text}</p>
          
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
          {isRecording ? "Listening for Bible verses..." : 'Click "Start Listening" to begin detecting Bible verses'}
        </p>
      )}
    </Card>
  )
}

export default TranscriptionResults