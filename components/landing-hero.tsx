"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import TypeWriterComponent from "typewriter-effect";
import { Button } from "./ui/button";

type Props = {};

const LandingHero = (props: Props) => {
    const {isSignedIn} = useAuth()
  return (
    <div className="py-36 text-center text-white font-bold space-y-4">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
        <h2>The Best AI Tool For</h2>
        <div className="text-transparent bg-clip-text bg-gradient-to-r  from-purple-400 to-pink-600">
          <TypeWriterComponent
            options={{
              autoStart: true,
              loop: true,
              strings: [
                "Chatbot.",
                "Image Generation.",
                "Video Generation.",
                "Music Generation.",
                "Code Generation.",
              ],
           
          
            }}
          />
        </div>
      </div>
      <p className="text-zinc-400 font-light text-sm md:text-xl">Create content using AI 10x faster.</p>
      <div>
        <Link href={isSignedIn ? '/dashboard' : 'sign-up'}>
            <Button variant={'premium'} className="rounded-full md:text-lg p-4 md:p-6">
                Start Generating For Free
            </Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingHero;
