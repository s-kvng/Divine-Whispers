import React, {useState} from 'react'
import { Card } from './ui/card';
import { Copy, Check } from "lucide-react"
import { Button } from './ui/button';
import { Verse } from '../types/verse';

type VerseDisplayProps = {
    currentVerse: Verse | null
    isListening: boolean
  }

const TranscriptionResults = ({ currentVerse, isListening }: VerseDisplayProps) => {
const [ copied , setCopied ] = useState(false);

const handleCopy = async () =>{
    await navigator.clipboard.writeText(`${currentVerse?.reference}\n${currentVerse?.text}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);  
}



  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm rounded-2xl p-6 min-h-[200px] flex flex-col justify-center">
      {currentVerse ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg">{currentVerse.reference}</h3>
            <Button variant="ghost" size="icon" onClick={handleCopy} className="shrink-0">
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <p className="text-muted-foreground text-sm mb-2">{currentVerse.text}</p>
          <time className="text-xs text-muted-foreground block">{currentVerse.timestamp.toLocaleTimeString()}</time>
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
          {isListening ? "Listening for Bible verses..." : 'Click "Start Listening" to begin detecting Bible verses'}
        </p>
      )}
    </Card>
  )
}

export default TranscriptionResults