"use client"

import React , {useEffect, useState} from 'react'
import ListeningCard from '../ListeningCard'
import TranscriptionResults from '../TranscriptionResults'
import { Verse } from '../../types/verse'

const Home = () => {

    const [isListening, setIsListening] = useState(false)
  const [currentVerse, setCurrentVerse] = useState<Verse | null>(null)

  const addVerse = (verse: Verse) => {
    setCurrentVerse(verse)
  }
  

  useEffect(() => {

    if (isListening) {
      const interval = setInterval(() => {
        addVerse({
          id: Math.random().toString(),
          reference: "John 3:16",
          text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
          timestamp: new Date(),
        })
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isListening, addVerse]) // Added addVerse to dependencies

  return (
    <>
     <h1>Verse</h1>
      <TranscriptionResults isListening={isListening} currentVerse={currentVerse} />
      <ListeningCard isListening={isListening} setIsListening={setIsListening} />
    </>
  )
}

export default Home