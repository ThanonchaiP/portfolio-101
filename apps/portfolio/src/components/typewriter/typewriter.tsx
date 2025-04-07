"use client";

import { useEffect, useState } from "react";

type TypewriterProps = {
  text: string;
  className?: string;
  delay?: number;
};

export const Typewriter = ({
  text,
  className,
  delay = 100,
}: TypewriterProps) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <h1 className={className}>
      {displayText}
      <span
        className={`ml-px inline-block w-[2px] bg-slate-200 ${
          showCursor ? "opacity-100" : "opacity-0"
        }`}
      >
        &nbsp;
      </span>
    </h1>
  );
};
