"use client";

import { NextPage } from "next";

import { ResultCarousel, ResultList } from "@/features/result";
import { useBreakpoint } from "@/hooks/use-breakpoint";

import "swiper/css";

const Home: NextPage = () => {
  const breakpoints = useBreakpoint();

  return (
    <div
      className="grid h-full gap-10 xl:pl-10"
      style={{
        ...(!["sm", "md"].includes(breakpoints ?? "lg") && {
          gap: "4%",
          gridTemplateColumns: " 1fr clamp(450px, 32vw, 38%)",
        }),
      }}
    >
      <ResultCarousel />
      <ResultList />
    </div>
  );
};

export default Home;
