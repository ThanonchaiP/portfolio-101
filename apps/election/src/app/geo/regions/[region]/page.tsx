"use client";

import axios from "axios";
import { use, useEffect } from "react";

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

  const { data, isPending, isError } = useGetRegionVote({ regionId: region });

  // useEffect(() => {
  //   const fetchRegion = async () => {
  //     // const response = await axios.get(`/api/candidates`);
  //     const response = await axios.get(`/api/regions/${region}`);
  //     console.log(response.data);
  //   };

  //   fetchRegion();
  // }, []);

  return (
    <>
      <div className="relative flex-1">
        <GeoRegionMap region={region} />
        <GeoSwitchData />
      </div>
      <div className="h-full w-[360px]">
        <GeoVoteList />
      </div>
    </>
  );
}
