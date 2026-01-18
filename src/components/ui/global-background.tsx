"use client";

import React from "react";

export function GlobalBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-50 bg-background">
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-emerald-900/20 rounded-full blur-[120px] -translate-y-1/2 mix-blend-screen" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-green-900/10 rounded-full blur-[100px] mix-blend-screen" />
    </div>
  );
}
