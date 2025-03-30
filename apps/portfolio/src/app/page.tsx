import Link from "next/link";

import { Typewriter } from "@/components/typewriter";

export default function Home() {
  return (
    <div className="flex h-full max-w-3xl flex-col gap-6 md:pt-32">
      <pre className="mb-4 hidden text-gray-300 md:block">
        {`
  ██╗  ██╗███████╗██╗     ██╗     █████╗     ██╗       ██╗ █████╗ ██████╗ ██╗     ██████╗ ██╗
  ██║  ██║██╔════╝██║     ██║     ██╔══██╗   ██║  ██╗  ██║██╔══██╗██╔══██╗██║     ██╔══██╗██║
  ███████║█████╗  ██║     ██║     ██║  ██║   ╚██╗████╗██╔╝██║  ██║██████╔╝██║     ██║  ██║██║
  ██╔══██║██╔══╝  ██║     ██║     ██║  ██║    ████╔═████║ ██║  ██║██╔══██╗██║     ██║  ██║╚═╝
  ██║  ██║███████╗███████╗███████╗╚█████╔╝    ╚██╔╝ ╚██╔╝ ╚█████╔╝██║  ██║███████╗██████╔╝██╗
  ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚════╝      ╚═╝   ╚═╝   ╚════╝ ╚═╝  ╚═╝╚══════╝╚═════╝ ╚═╝`}
      </pre>

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

      <div className="flex space-x-4">
        <Link
          href="/about"
          className="rounded bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700 md:text-base"
        >
          About Me
        </Link>
        <button className="rounded border border-gray-300 px-4 py-2 text-sm text-gray-300 transition-colors hover:bg-teal-900/30 md:text-base">
          Download Resume
        </button>
      </div>
    </div>
  );
}
