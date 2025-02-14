"use client"

import React from 'react'
import ListeningCard from '../ListeningCard'
import TranscriptionResults from '../TranscriptionResults'
//import { useSpeechRecognition } from '../hooks/useSpeechRecognition'
import { useBibleListening } from '../hooks/useBibleListening'

const Home = () => {

    // const { isRecording, transcript, error, handleStartRecording, stopRecording } =
    // useSpeechRecognition();
    const { isRecording, currentQuote, handleStartRecording, handleStopRecording, error} = useBibleListening();

  const toggleRecording = () => {
    if (isRecording) {
      handleStopRecording()
    } else {
      handleStartRecording();
    }
  };

  return (
    <>
     <h1 className='text-2xl font-bold'>Verse</h1>
     {error && <p className="text-red-500">{error}</p>}
      <TranscriptionResults transcript={currentQuote} isRecording={isRecording} />
      <ListeningCard isRecording={isRecording} toggleRecording={toggleRecording} />
    </>
  )
}

export default Home