"use client";

import { Typewriter } from "@/components/typewriter";
import { HomeNavigation } from "@/features/home";

export default function Home() {
  return (
    <div className="grid grid-cols-1 gap-8 py-4">
      <pre className="mb-4 hidden text-gray-300 md:block">{ascii}</pre>

      <Typewriter
        text="👋 Hi, I'm Thanonchai Paliwong"
        className="text-lg font-bold text-slate-200 md:text-2xl lg:text-3xl"
      />
      <p className="text-sm text-slate-400 md:text-lg">
        Frontend Developer dedicated to building modern, high-performance
        applications. My expertise includes JavaScript, TypeScript, React,
        Tailwind CSS, and Next.js, ensuring scalable and visually stunning web
        solutions.
      </p>

      <HomeNavigation />
    </div>
  );
}

const ascii = `
  ██╗  ██╗███████╗██╗     ██╗     █████╗     ██╗       ██╗ █████╗ ██████╗ ██╗     ██████╗ ██╗
  ██║  ██║██╔════╝██║     ██║     ██╔══██╗   ██║  ██╗  ██║██╔══██╗██╔══██╗██║     ██╔══██╗██║
  ███████║█████╗  ██║     ██║     ██║  ██║   ╚██╗████╗██╔╝██║  ██║██████╔╝██║     ██║  ██║██║
  ██╔══██║██╔══╝  ██║     ██║     ██║  ██║    ████╔═████║ ██║  ██║██╔══██╗██║     ██║  ██║╚═╝
  ██║  ██║███████╗███████╗███████╗╚█████╔╝    ╚██╔╝ ╚██╔╝ ╚█████╔╝██║  ██║███████╗██████╔╝██╗
  ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚════╝      ╚═╝   ╚═╝   ╚════╝ ╚═╝  ╚═╝╚══════╝╚═════╝ ╚═╝`;
