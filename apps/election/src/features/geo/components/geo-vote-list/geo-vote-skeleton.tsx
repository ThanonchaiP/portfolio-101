import { Skeleton } from "@/components/skeleton";

export const GeoVoteSkeleton = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="flex cursor-pointer gap-3 border-b border-gray-300 bg-white pb-2 pl-[14px] pr-2 pt-4 transition-colors hover:bg-[#FAF2EC]"
        >
          <Skeleton.Image width="w-16" height="h-16" />
          <div className="flex-1 space-y-2">
            <Skeleton.Text width="w-1/2" />
            <Skeleton.Text width="w-full" height="h-3" />
            <Skeleton.Text width="w-4/5" height="h-3" />
          </div>
        </div>
      ))}
    </>
  );
};
