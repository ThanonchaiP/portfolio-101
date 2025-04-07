import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

import { IDELayout } from "@/components/IDE";

import "./globals.css";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio - VS Code",
  description: "A developer portfolio styled like VS Code",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${jetbrainsMono.className} antialiased`}
      >
        <IDELayout>{children}</IDELayout>
      </body>
    </html>
  );
}
