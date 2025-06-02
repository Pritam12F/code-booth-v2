"use client";

import { WavyBackground } from "@workspace/ui/components/wavy-background";
import React from "react";

export function WavyBackgroundDemo() {
  return (
    <WavyBackground className="max-w-4xl mx-auto pb-40">
      <p className="text-xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
        CodeBooth
      </p>
      <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
        Conduct machine coding rounds the correct way. The CodeBooth Way
      </p>
    </WavyBackground>
  );
}
