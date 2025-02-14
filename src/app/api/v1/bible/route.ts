// app/api/bible/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.json({ error: "Missing reference query parameter" }, { status: 400 });
  }

  // Parse the reference assuming format: "Book Chapter:Verse" (e.g., "John 3:16")
  const match = reference.match(/^(.+?)\s+(\d+):(\d+)$/);
  if (!match) {
    return NextResponse.json(
      { error: "Invalid reference format. Expected format: 'Book Chapter:Verse'" },
      { status: 400 }
    );
  }

  const [, book, chapterStr, verseStr] = match;
  const chapter = parseInt(chapterStr, 10);
  const verse = parseInt(verseStr, 10);

  // Query the database for the given Bible verse
  const quote = await prisma.kJV.findFirst({
    where: {
      book,
      chapter,
      verse,
    },
  });

  if (!quote) {
    return NextResponse.json({ error: "Quote not found" }, { status: 404 });
  }

  return NextResponse.json(quote);
}
