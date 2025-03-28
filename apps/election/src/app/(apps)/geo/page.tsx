"use client";

import {
  GeoPartyCount,
  GeoRegionMap,
  GeoSwitchData,
  GeoVoteList,
  useGetGeoVote,
} from "@/features/geo";

export default function GeoPage() {
  const { data, isPending } = useGetGeoVote();

  return (
    <>
      <div className="relative flex max-h-[1100px] flex-col items-center gap-8 lg:col-start-1 lg:col-end-3 xl:col-span-1 xl:h-[calc(100vh-4rem)] xl:max-h-none">
        <GeoSwitchData />
        <div className="flex max-h-full w-full flex-col">
          <GeoRegionMap
            region="geo"
            data={data?.data}
            className="max-h-[780px] xl:max-h-none"
          />
          <GeoPartyCount className="md:max-w-[211px] xl:hidden" />
        </div>
      </div>

      <GeoVoteList data={data?.data} isLoading={isPending} />
    </>
  );
}
