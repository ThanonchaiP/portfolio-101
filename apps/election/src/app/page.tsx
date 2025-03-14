"use client";

import { NextPage } from "next";

import { ResultCarousel, ResultList } from "@/features/result";

import "swiper/css";

const Home: NextPage = () => {
  return (
    <div
      className="grid h-full flex-1 gap-10 pl-10"
      style={{
        gap: "4%",
        gridTemplateColumns: " 1fr clamp(450px, 32vw, 38%)",
      }}
    >
      <ResultCarousel />
      <ResultList />
    </div>
  );
};

export default Home;
