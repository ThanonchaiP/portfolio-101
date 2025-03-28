"use client";

import { use } from "react";

import {
  GeoPartyCount,
  GeoRegionMap,
  GeoSwitchData,
  GeoVoteList,
  useGetRegionVote,
} from "@/features/geo";

type RegionPageProps = {
  params: Promise<{ region: string }>;
};

export default function RegionPage({ params }: RegionPageProps) {
  const { region } = use(params);

  const { data, isPending } = useGetRegionVote({ regionId: region });

  return (
    <>
      <div className="relative flex max-h-[1100px] flex-col items-center gap-8 lg:col-start-1 lg:col-end-3 xl:col-span-1 xl:h-[calc(100vh-4rem)] xl:max-h-none">
        <GeoSwitchData />
        <div className="flex max-h-full w-full flex-1 flex-col xl:h-full">
          <GeoRegionMap
            region={region}
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
