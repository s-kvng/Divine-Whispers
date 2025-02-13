"use client";

import React from "react";
import { XIcon } from "@/components/icons/XIcon";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-black/80 h-[4rem] flex items-center absolute w-full">
      <footer className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 flex items-center justify-center gap-4 md:text-xl font-inter text-[#8a8a8e]">
        <span className="text-base text-[#4e4e52]">share it</span>
        <Link
          href="#"
          onClick={(e) => {
            window.open(
              "https://twitter.com/intent/tweet?text=%F0%9F%94%A5%F0%9F%8E%89%20Check%20out%20this%20awesome%20%23AI%20demo%20by%20%40Deepgram%20and%20%40lukeocodes%0A%0A%20https%3A//aura-tts-demo.deepgram.com",
              "",
              "_blank, width=600, height=500, resizable=yes, scrollbars=yes"
            );

            return e.preventDefault();
          }}
          aria-label="share on twitter"
          target="_blank"
        >
          <XIcon className="mb-1" />
        </Link>
        <Link
          href="#"
          onClick={(e) => {
            window.open(
              "https://www.linkedin.com/shareArticle?mini=true&url=https%3A//aura-tts-demo.deepgram.com&title=Excellent review on my website reviews",
              "",
              "_blank, width=600, height=500, resizable=yes, scrollbars=yes"
            );

            return e.preventDefault();
          }}
          aria-label="share on Linkedin"
        >
          <LinkedInIcon className="mb-1" />
        </Link>
        {/* <a
              href="#"
              onClick={(e) => {
                window.open(
                  "https://www.facebook.com/sharer/sharer.php?u=https%3A//aura-tts-demo.deepgram.com",
                  "",
                  "_blank, width=600, height=500, resizable=yes, scrollbars=yes"
                );

                return e.preventDefault();
              }}
              target="_blank"
              aria-label="share on Facebook"
            >
              <FacebookIcon className="mb-1" />
            </a> */}
        <div className="border-l border-[#4e4e52] w-px h-7">&nbsp;</div>
        <Link
          className="text-base font-semibold"
          href="https://deepgram.com/contact-us"
          target="_blank"
        >
          contact us
        </Link>
      </footer>
    </div>
  );
};

export default Footer;
