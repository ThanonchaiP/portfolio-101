import type { Metadata } from "next";
import { Kanit } from "next/font/google";

import AppProvider from "@/providers/app";

import "./globals.css";

const geistSans = Kanit({
  variable: "--font-kanit-sans",
  subsets: ["thai"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "เช็คผลคะแนนเลือกตั้ง 66 เรียลไทม์",
  description: "เช็คผลคะแนนเลือกตั้ง 66 เรียลไทม์",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
