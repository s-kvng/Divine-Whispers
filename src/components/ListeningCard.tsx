"use client"

import React from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Mic , MicOff} from "lucide-react"

type ControlCardProps = {
  isListening: boolean
  setIsListening: (isListening: boolean) => void
}

const ListeningCard = ({ isListening, setIsListening }: ControlCardProps) => {

  return (
    <Card className="w-full max-w-xl bg-white rounded-3xl shadow-lg p-8">
        <div className="flex flex-col items-center gap-6">
          {/* Status indicator */}
          <div className={`w-16 h-16 rounded-full bg-[#f7f7f7] flex items-center justify-center`}>
            {isListening ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="animate-pulse"
              >
                <path d="M4 10h3v4H4v-4zm6.5-1.5h3v7h-3v-7zm6.5-3h3v13h-3V5.5z" fill="#1a1a1a" />
              </svg>
            ) : (
              <div className="w-2 h-2 rounded-full bg-[#1a1a1a]" />
            )}
          </div>

          {/* Status text */}
          <p className="text-[#1a1a1a] text-center">
            Transcribing and detecting
            <br />
            Bible quotations in real time.
          </p>

          {/* Listen button */}
          <Button
            className={`rounded-full px-4 py-2 h-auto text-sm ${
              isListening
                ? "bg-[#FFE5E5] hover:bg-[#FFD6D6] text-[#FF4545]"
                : "bg-[#0e121b] hover:bg-[#1a1a1a] text-white"
            }`}
            onClick={() => setIsListening(!isListening)}
          >
            {isListening ? (
              <>
                <MicOff className="w-5 h-5 mr-2" />
                Stop Listening
              </>
            ) : (
              <>
                <Mic className="w-5 h-5 mr-2" />
                Start Listening
              </>
            )}
          </Button>
        </div>
      </Card>
  )
}

export default ListeningCard