"use client";

import { NextPage } from "next";

import { ResultCarousel, ResultList } from "@/features/result";

import "swiper/css";

const Home: NextPage = () => {
  return (
    <div className="flex h-full flex-1 gap-10 overflow-hidden pl-10">
      <ResultCarousel />
      <ResultList />
    </div>
  );
};

export default Home;
