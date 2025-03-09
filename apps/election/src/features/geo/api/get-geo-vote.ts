import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { regions } from "@/data/votes/regions";
import { queryKeys } from "@/lib/query-keys";

import { RegionVoteResponseSchema } from "../schemas";
import { RegionVoteResponse } from "../types";

export const getGeoVote = (): Promise<RegionVoteResponse> => {
  const response = { data: regions };
  return Promise.resolve(RegionVoteResponseSchema.parse(response));
};

export const useGetGeoVote = () => {
  const query = useQuery({
    queryFn: () => getGeoVote(),
    placeholderData: keepPreviousData,
    queryKey: [queryKeys.region.detail("geo").queryKey],
  });

  return query;
};
