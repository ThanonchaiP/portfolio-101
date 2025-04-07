"use client";

import { JetBrains_Mono } from "next/font/google";
import Prism from "prismjs";
import { useEffect } from "react";

import { cn } from "@/lib/utils";

import "prismjs/components/prism-json";
import "prismjs/components/prism-typescript";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });

interface StyledCodeProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "json" }: StyledCodeProps) {
  useEffect(() => {
    const highlight = () => {
      Prism.highlightAll();
      if (language === "json") {
        // Add custom classes to braces
        const codeElement = document.querySelector("code.language-json");
        if (codeElement) {
          const tokens = Array.from(codeElement.childNodes);
          // Find first and last curly braces
          const firstBrace = tokens.find(
            (token) => (token as Element).textContent === "{"
          ) as Element;
          const lastBrace = tokens
            .slice()
            .reverse()
            .find((token) => (token as Element).textContent === "}") as Element;

          if (firstBrace?.classList) firstBrace.classList.add("outer-brace");
          if (lastBrace?.classList) lastBrace.classList.add("outer-brace");

          // Mark other braces as inner and make URLs clickable
          tokens.forEach((token) => {
            const element = token as Element;
            if (element.textContent === "{" || element.textContent === "}") {
              if (
                element.classList &&
                !element.classList.contains("outer-brace")
              ) {
                element.classList.add("inner-brace");
              }
            }
            // Check if token is a URL string
            if (
              element.classList?.contains("string") &&
              element.textContent?.startsWith('"http')
            ) {
              const url = element.textContent.slice(1, -1); // Remove quotes
              const link = document.createElement("a");
              link.href = url;
              link.target = "_blank";
              link.rel = "noopener noreferrer";
              link.className = "token string url-link";
              link.textContent = element.textContent;
              element.parentNode?.replaceChild(link, element);
            }
          });
        }
      }
    };
    highlight();
  }, [code, language]);

  return (
    <div className={`${jetbrainsMono.className} overflow-hidden`}>
      <pre className="rounded-lg text-base">
        <code className={cn(`language-${language}`)}>{code}</code>
      </pre>
      <style jsx global>{`
        .token.comment,
        .token.prolog,
        .token.doctype,
        .token.cdata {
          color: #7c7c7c;
        }
        .token.punctuation {
          color: #e1e1e1;
        }
        .token.property {
          color: #7dd3fc;
        }
        .token.keyword,
        .token.tag {
          color: #5299d5;
        }
        .token.class-name,
        .token.builtin,
        .token.interface {
          color: #43bba3;
        }
        .token.string,
        .token.attr-value {
          color: #d97706;
        }
        .url-link {
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .url-link:hover {
          opacity: 0.8;
          text-decoration: underline;
        }
        .token.number {
          color: #c5e478;
        }
        .token.operator {
          color: #e1e1e1;
        }
        .token.boolean {
          color: #5299d5;
        }
        .token.function {
          color: #ffd580;
        }
        .language-typescript .token.primitive,
        .language-typescript .token.builtin,
        .language-typescript .token.keyword {
          color: #5299d5;
        }
        .language-typescript .token.class-name,
        .language-typescript .token.builtin,
        .language-typescript .token.interface {
          color: #43bba3;
        }
        .language-typescript .token.type-declaration {
          color: #43bba3;
        }
        .language-typescript .token.type {
          color: #43bba3;
        }
        pre[class*="language-"] {
          background: transparent;
          margin: 0;
          overflow: auto;
          font-size: 16px;
        }
        code[class*="language-"] {
          background: transparent;
          white-space: pre-wrap;
          word-break: break-word;
        }

        /* Style curly braces */
        .outer-brace {
          color: #fde047 !important;
        }

        .inner-brace {
          color: #e879f9 !important;
        }
      `}</style>
    </div>
  );
}
