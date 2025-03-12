"use client";

import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import formation from "@/data/formation.json";
import parties from "@/data/parties.json";
import { cn } from "@/lib/utils";
import { Party } from "@/types";

import "swiper/css";

export const ResultCarousel = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  const partiesObj = parties.reduce((acc: Record<string, Party>, party) => {
    acc[party.id] = party;
    return acc;
  }, {});

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex h-full max-w-[800px] flex-1 items-center justify-center">
      <div className="relative m-auto h-fit w-full pb-[70px]">
        <div className="m-auto w-fit">
          <div className="flex items-center gap-2 rounded bg-white px-3 py-2">
            <p className="mb-0 text-[var(--primary)]">ดูสูตรจับขั้วรัฐบาล</p>
            <div className="flex gap-[2px]">
              {formation.map((_, i) => (
                <button
                  key={i}
                  className={cn(
                    "size-8 rounded bg-[var(--background)] text-xl font-bold",
                    activeIndex === i + 1 && "bg-[var(--primary)] text-white",
                  )}
                  onClick={() => swiperRef?.current?.slideTo(i)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative m-auto grid grid-cols-[48px,1fr,48px] items-center">
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
              autoplay={{ delay: 5000 }}
              className="h-auto w-full"
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex + 1)}
            >
              {formation.map((_, i) => (
                <SwiperSlide className="!w-full" key={i}>
                  <div className="relative z-0 w-full pt-[85%]">
                    <div className="absolute inset-0 grid grid-cols-[1fr,1.25fr,1fr] items-center">
                      <div
                        className="relative w-full border pt-[177%]"
                        style={{ borderColor: "#e6e4e3" }}
                      >
                        <div
                          className="absolute inset-0 overflow-hidden"
                          style={{
                            background:
                              "linear-gradient(rgb(201, 189, 182) 0%, rgb(255, 245, 240) 100%)",
                          }}
                        >
                          <div className="relative flex size-full items-center justify-center">
                            <div
                              className="absolute inset-0 bg-cover bg-center"
                              style={{
                                backgroundImage: "url(/img/goku-lg.webp)",
                              }}
                            ></div>
                            <div className="absolute bottom-7 left-0 flex size-[64px] flex-col justify-center bg-slate-50 text-center">
                              <h3 className="h-[30px] text-3xl font-bold text-[var(--primary)]">
                                71
                              </h3>
                              <p className="text-[var(--primary)]">ที่นั่ง</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="relative w-full border border-gray-300 pt-[177%]">
                        <div
                          className="absolute inset-0 overflow-hidden"
                          style={{
                            background:
                              "linear-gradient(rgb(201, 189, 182) 0%, rgb(255, 245, 240) 100%)",
                          }}
                        >
                          <div className="relative flex size-full items-center justify-center">
                            <div
                              className="absolute inset-0 bg-cover bg-center"
                              style={{
                                backgroundImage: "url(/img/test.png)",
                              }}
                            ></div>
                            <div className="absolute bottom-9 left-6 flex size-[74px] flex-col justify-center bg-slate-50 text-center">
                              <h3 className="h-[36px] text-4xl font-bold text-[var(--primary)]">
                                71
                              </h3>
                              <p className="text-[var(--primary)]">ที่นั่ง</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="relative w-full border border-gray-300 pt-[177%]">
                        <div
                          className="absolute inset-0 overflow-hidden"
                          style={{
                            background:
                              "linear-gradient(rgb(201, 189, 182) 0%, rgb(255, 245, 240) 100%)",
                          }}
                        >
                          <div className="relative flex size-full items-center justify-center">
                            <div
                              className="absolute inset-0 bg-cover bg-center"
                              style={{
                                backgroundImage: "url(/img/conan-lg.webp)",
                              }}
                            ></div>
                            <div className="absolute bottom-7 right-0 flex size-[64px] flex-col justify-center bg-slate-50 text-center">
                              <h3 className="h-[30px] text-3xl font-bold text-[var(--primary)]">
                                71
                              </h3>
                              <p className="text-[var(--primary)]">ที่นั่ง</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
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

          <div className="absolute bottom-[14px] right-0 flex cursor-pointer items-center gap-2">
            <div className="inline-block size-4 bg-slate-400" />
            <h3>
              พรรคอื่น ๆ 65 ที่นั่ง
              <Icon
                icon="material-symbols:info"
                className="ml-1 inline-block pb-[2px] text-lg text-gray-500"
              />
            </h3>
          </div>
        </div>

        <div className="relative flex h-8 w-full items-center bg-white">
          <div className="absolute left-2 flex h-full gap-1 text-white">
            <p className="pt-[5px]">รวม</p>
            <p className="flex items-center pb-[3px] text-[26px] font-bold">
              323
            </p>
            <p className="pt-[5px]">ที่นั่ง</p>
          </div>

          <div className="flex size-full">
            <span className="flex h-full w-1/3 items-center justify-center bg-[red]"></span>
            <span className="flex h-full w-1/3 items-center justify-center bg-gray-700"></span>
            <span className="flex h-full w-1/6 items-center justify-center bg-orange-400"></span>
          </div>

          <div className="absolute right-2 flex h-full gap-1 text-gray-300">
            <p className="flex items-center pb-[3px] text-[26px] font-bold">
              400
            </p>
            <p className="pt-[5px]">ที่นั่ง</p>
          </div>

          <div className="absolute left-1/2 top-0 border-l border-dashed border-black pt-10">
            <span className="ml-2">200 ที่นั่ง</span>
            <span className="ml-1 text-xs text-gray-600">
              (กึ่งหนึ่งของ ส.ส.)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
