import { cn } from "@/lib/utils";

import { Formation } from "../../types";

type CarouselPaginationProps = {
  activeIndex: number;
  formations: Formation[];
  onSlideTo: (index: number) => void;
};

export const CarouselPagination = ({
  formations,
  activeIndex,
  onSlideTo,
}: CarouselPaginationProps) => {
  return (
    <div className="flex w-full justify-end lg:justify-center">
      <div className="relative z-[1] mb-4 w-fit lg:mb-8">
        <div className="flex items-center gap-2 rounded bg-white px-3 py-2">
          <p className="mb-0 text-[var(--primary)]">ดูสูตรจับขั้วรัฐบาล</p>
          <div className="flex gap-[2px]">
            {formations.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "size-8 rounded bg-[var(--background)] text-lg font-bold",
                  activeIndex === index && "bg-[var(--primary)] text-white",
                )}
                onClick={() => onSlideTo(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
