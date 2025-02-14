import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { type NextRequest } from 'next/server'


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req : NextRequest) {
  const { transcription } = await req.json();

  if (!transcription) {
    return NextResponse.json({ error: "No transcription provided" }, { status: 400 });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Extract Bible quote references from the following text. Return only the reference (e.g., John 3:16) or "none" if no reference is found: "${transcription}"`;
    const result = await model.generateContent(prompt);
    const response =  result.response;
    const quoteReference = response.text().trim();

    return NextResponse.json({ quoteReference });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Quote extraction failed" }, { status: 500 });
  }
}