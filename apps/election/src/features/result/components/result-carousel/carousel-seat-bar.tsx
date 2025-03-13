import { Icon } from "@iconify/react/dist/iconify.js";

export const CarouselSeatBar = () => {
  return (
    <div className="relative flex h-8 w-full items-center bg-white">
      <div className="absolute bottom-[50px] right-0 z-10 flex cursor-pointer items-center gap-2">
        <div className="inline-block size-4 bg-slate-400" />
        <h3>
          พรรคอื่น ๆ 65 ที่นั่ง
          <Icon
            icon="material-symbols:info"
            className="ml-1 inline-block pb-[2px] text-lg text-gray-500"
          />
        </h3>
      </div>

      <div className="absolute left-2 flex h-full gap-1 text-white">
        <p className="pt-[5px]">รวม</p>
        <p className="flex items-center pb-[3px] text-[26px] font-bold">323</p>
        <p className="pt-[5px]">ที่นั่ง</p>
      </div>

      <div className="flex size-full">
        <span className="flex h-full w-1/3 items-center justify-center bg-[red]"></span>
        <span className="flex h-full w-1/3 items-center justify-center bg-gray-700"></span>
        <span className="flex h-full w-1/6 items-center justify-center bg-orange-400"></span>
      </div>

      <div className="absolute right-2 flex h-full gap-1 text-gray-300">
        <p className="flex items-center pb-[3px] text-[26px] font-bold">400</p>
        <p className="pt-[5px]">ที่นั่ง</p>
      </div>

      <div className="absolute left-1/2 top-0 border-l border-dashed border-black pt-10">
        <span className="ml-2">200 ที่นั่ง</span>
        <span className="ml-1 text-xs text-gray-600">(กึ่งหนึ่งของ ส.ส.)</span>
      </div>
    </div>
  );
};
