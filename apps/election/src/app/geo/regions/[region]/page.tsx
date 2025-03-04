"use client";

import { use } from "react";

import {
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
      <div className="relative flex-1">
        <GeoRegionMap region={region} />
        <GeoSwitchData />
      </div>
      <div className="h-full w-[360px]">
        <GeoVoteList data={data?.data} isLoading={isPending} />
      </div>
    </>
  );
}
