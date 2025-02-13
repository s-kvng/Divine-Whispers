"use client"

import React from "react";
import Image from "next/image";
import Link from "next/link";
import GitHubButton from "react-github-btn";

const Navbar = () => {
  return (
    <div className="bg-gradient-to-b from-black/50 to-black/10 backdrop-blur-[2px] h-[4rem] flex items-center">
      <header className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 flex items-center justify-between">
        <div>
          <Link className="flex items-center" href="/">
            <Image
              className="w-auto h-8 max-w-[12.5rem] sm:max-w-none"
              src="/deepgram.svg"
              alt="Deepgram Logo"
              width={0}
              height={0}
              priority
            />
          </Link>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <span className="mt-1">
            <GitHubButton
              href="https://github.com/deepgram-starters/nextjs-live-transcription"
              data-color-scheme="no-preference: light; light: light; dark: light;"
              data-size="large"
              data-show-count="true"
              aria-label="Star deepgram-starters/nextjs-live-transcription on GitHub"
            >
              Star
            </GitHubButton>
          </span>

          <span className="gradient-shadow bg-gradient-to-r to-[#13EF93]/50 from-[#149AFB]/80 rounded">
            <Link
              href="https://console.deepgram.com/signup?jump=keys"
              target="_blank"
              className="hidden text-xs md:inline-block bg-black text-white rounded m-px px-8 py-2 font-semibold"
            >
              Get an API Key
            </Link>
          </span>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
