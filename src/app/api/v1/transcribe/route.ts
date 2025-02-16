import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { pusherServer } from "@/lib/pusher";
import fs from "fs";
import path from "path";

// setup groq API server
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, // ensure this is set in your .env.local
});
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(request: Request) {
  console.log("transcribing request")
  try {
    const formData = await request.formData();
    const audioFile = formData.get("audio") as Blob;

    if (!audioFile) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }

    // Convert the File into a Buffer and write to a temporary file.
    const arrayBuffer = await audioFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const tempDir = "/tmp"; // Adjust if necessary.
    const fileName = `audio-${Date.now()}.webm`;
    const tempFilePath = path.join(tempDir, fileName);
    fs.writeFileSync(tempFilePath, buffer);


    // Transcribe audio using Groq's transcription service.
    const transcription = await groq.audio.transcriptions.create({
      file: fs.createReadStream(tempFilePath),
      model: "whisper-large-v3", // or "whisper-1" if preferred
      response_format: "text",
    });

    console.log(transcription)

    // Clean up the temporary file.
    fs.unlinkSync(tempFilePath);

    // Extract reference
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
    You are given a transcription of a sermon: 
    "${transcription}"
    
    Your task is to extract a Bible reference from this text. The reference may be explicitly stated (e.g., "John chapter 3 verse 16", "John 3:16", or "the scripture, John 3:16"), or it may be mentioned implicitly (e.g., "the next verse", "a famous passage", etc.). 
    
    Please follow these rules:
    1. If the text contains a valid Bible reference, return it in the standard format "Book Chapter:Verse" (for example, "John 3:16").
    2. If multiple references are mentioned, return only the first valid reference.
    3. If the text contains an implicit or ambiguous reference that does not clearly specify a book, chapter, and verse, or if no valid reference is detected at all, return the word "none".
    
    Only return the extracted reference in the required format or "none" if no valid reference exists. Do not include any additional text.
    `;

    const result = await model.generateContent(prompt);
    const reference = result.response.text().trim();

    console.log("Extracted reference:", reference);

    if (reference.toLowerCase() === "none") {
      return NextResponse.json({ message: "No Bible quote detected" });
    }

    // Get Bible text from your API
    const bibleRes = await fetch(
      `${
        process.env.NEXT_PUBLIC_SITE_URL
      }/api/v1/bible?reference=${encodeURIComponent(reference)}`
    );

    console.log(bibleRes)

    if (!bibleRes.ok) throw new Error("Bible API failed");
    const bibleData = await bibleRes.json();

    if (!pusherServer) {
      throw new Error("Pusher server not available");
    }

    // Trigger Pusher event
    await pusherServer.trigger("bible-quotes", "new-quote", {
      reference: reference,
      text: bibleData.text,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Processing error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
