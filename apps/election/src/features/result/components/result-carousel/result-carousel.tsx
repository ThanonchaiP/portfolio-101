"use client";

import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import formations from "@/data/formations.json";
import { useGetPartyCount } from "@/features/geo";
import { PartyCount } from "@/types";

import { CarouselBanner } from "./carousel-banner";
import { CarouselCharacterCard } from "./carousel-character-card";
import { CarouselPagination } from "./carousel-pagination";
import { CarouselSeatBar } from "./carousel-seat-bar";

import "swiper/css";

export const ResultCarousel = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const partyCount = useGetPartyCount({ regionId: "geo" });

  const partyCountObj =
    partyCount.data?.reduce((acc: Record<string, PartyCount>, party) => {
      acc[party.id] = party;
      return acc;
    }, {}) ?? {};

  const onSlideTo = (index: number) => {
    swiperRef?.current?.slideToLoop(index);
  };

  const onSlideChange = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="flex h-full max-w-[800px] flex-1 items-center justify-center">
      <div className="relative m-auto h-fit w-full pb-[60px]">
        <CarouselPagination
          activeIndex={activeIndex}
          formations={formations}
          onSlideTo={onSlideTo}
        />

        <CarouselBanner />

        <div className="m-auto grid grid-cols-[48px,1fr,48px] items-center">
          <button
            aria-label="Previous slide"
            onClick={() => swiperRef?.current?.slidePrev()}
            className="flex size-8 items-center justify-center rounded bg-[var(--primary)] text-white"
          >
            <Icon
              icon="material-symbols:arrow-back-ios-new-rounded"
              fontSize={24}
            />
          </button>
          <div className="relative mx-auto block h-auto w-full">
            <Swiper
              loop
              modules={[Autoplay]}
              autoplay={{ delay: 10000 }}
              className="h-auto w-full"
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) => onSlideChange(swiper.realIndex)}
            >
              {formations.map((formation, i) => {
                const [first, second, third] =
                  formation.governmentPartyRefCodes;

                return (
                  <SwiperSlide className="!w-full" key={i}>
                    <div className="relative z-0 w-full pt-[85%]">
                      <div className="absolute inset-0 grid grid-cols-[1fr,1.25fr,1fr] items-center">
                        <CarouselCharacterCard
                          position="left"
                          seatCount={partyCountObj[second]?.count}
                          image="/img/goku-lg.webp"
                        />
                        <CarouselCharacterCard
                          position="center"
                          seatCount={partyCountObj[first]?.count}
                          image="/img/test.png"
                        />
                        <CarouselCharacterCard
                          position="right"
                          seatCount={partyCountObj[third]?.count}
                          image="/img/conan-lg.webp"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <button
            aria-label="Next slide"
            onClick={() => swiperRef?.current?.slideNext()}
            className="ml-auto flex size-8 items-center justify-center rounded bg-[var(--primary)] text-white"
          >
            <Icon
              icon="material-symbols:arrow-forward-ios-rounded"
              fontSize={24}
            />
          </button>
        </div>

        <CarouselSeatBar
          partyCount={partyCountObj}
          formation={formations[activeIndex]}
        />
      </div>
    </div>
  );
};
