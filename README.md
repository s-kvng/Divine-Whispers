# AI Bible Quotation App

The **AI Bible Quotation App** is an innovative web application designed to listen to sermons in real-time, transcribe the spoken word, extract Bible references, and display the full Bible quotations. It leverages cutting-edge technologies such as Next.js (with the App Router), Groq (or OpenAI) for transcription, Google Generative AI for Bible reference extraction, Prisma with SQLite for Bible data storage, and Pusher for real-time updates.

## Table of Contents

- [AI Bible Quotation App](#ai-bible-quotation-app)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Architecture](#architecture)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Folder Structure](#folder-structure)
  - [Contributions](#contributions)
  - [License](#license)
  - [Acknowledgements](#acknowledgements)

## Overview

The AI Bible Quotation App listens during sermons and performs the following steps in real-time:

1. **Audio Capture:** Uses the browser’s MediaRecorder API to capture audio.
2. **Transcription:** Sends audio data to an API endpoint that transcribes it using Groq's (or OpenAI's) Whisper model.
3. **Reference Extraction:** Utilizes Google Generative AI to extract Bible references (e.g., "John 3:16") from the transcription.
4. **Bible Quote Retrieval:** Queries a local Bible database (populated from a KJV SQL file via Prisma) for the full quote.
5. **Real-Time Updates ⚗️ :** Delivers the quote to the user interface in real-time using Pusher.

## Features

- **Real-Time Audio Transcription(Not fully Implemented yet) ⚗️ :** Capture audio continuously during sermons.
- **Bible Reference Extraction:** Robust prompt engineering to extract explicit and implicit Bible references.
- **Local Bible Database:** Query a fully integrated KJV Bible database using Prisma.
- **Real-Time Updates:** Instantaneous delivery of quotes using Pusher.
- **Next.js Full-Stack Application:** Seamless integration of frontend and backend using the latest Next.js App Router.

## Architecture

The project is built using the following stack:

- **[Next.js](http://nextjs.org/) (App Router):** For both frontend and backend (API routes).
- **[Groq SDK](https://groq.com/) :** To transcribe audio using the Whisper model.
- **[Google Generative AI](https://ai.google.dev):** For extracting Bible references from transcription text.
- **[Prisma](https://www.prisma.io/) + SQLite:** To manage and query the KJV Bible database.
- **[Pusher:](pusher.com)** For real-time updates from the server to the client.
- **MediaRecorder API:** To capture live audio on the client side.

## Installation

1. **Clone the Repository:**

   ```bash
   git clone git@github.com:s-kvng/Divine-Whispers.git
   cd divine-whispers
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Database Setup**
    ```sh
    dev.db (already in folder)
    ```

4. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

5. **Environment Setup**
   ```bash
   rename env.example to .env.local & add variables
   ``` 

## Usage
1. **Start the Development Server:**
   ```bash
   pnpm dev or npm run dev
   ```

2. **Start the Development Server:**
   ```bash
   Visit http://localhost:3000 in your browser.
   ```


## Folder Structure
```bash
ai-bible-quotation-app/
├── app/
│   ├── api/
│   │   └── v1/
│   │       ├── transcribe/
│   │       │   └── route.ts         # API route for audio transcription and Bible reference extraction
│   │       └── bible/
│   │           └── route.ts         # API route for fetching Bible quotes from the database
│   └── page.tsx                     # Main page using the custom hooks
├── hooks/
│   └── useBibleListening.ts         # Custom hook to manage recording and Pusher subscription
├── lib/
│   ├── prisma.ts                    # Prisma client instance
│   └── pusher.ts                    # Pusher client and server instances
├── prisma/
│   └── schema.prisma                # Prisma schema file
├── kjv_bible.sql                    # SQL file containing KJV Bible data
├── .env.example                       # Environment variables
├── package.json
└── README.md                        # This file
```

## Contributions
Not all features are implemented yet, so contributions are welcome! Please fork the repository and create a pull request with your proposed changes. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.

## Acknowledgements
- [Next.js](https://nextjs.org/)
- [Groq SDK](https://groq.io/)
- Google Generative AI
- [Pusher](https://pusher.com/)
- [Prisma](https://www.prisma.io/)
  
  ------------------------

                          Happy Valentine's Day ❤️
