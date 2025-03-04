import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

import { API_URL } from "@/config";
import { queryKeys } from "@/lib/query-keys";

import { RegionVoteResponseSchema } from "../schemas";
import { RegionVoteResponse } from "../types";

type GetRegionVote = {
  regionId: string;
};

export const getRegionVote = async ({
  regionId,
}: GetRegionVote): Promise<RegionVoteResponse> => {
  const response = await axios.get(`/regions/${regionId}`, {
    baseURL: API_URL,
  });
  return RegionVoteResponseSchema.parse(response.data);
};

export const useGetRegionVote = (params: GetRegionVote) => {
  const query = useQuery({
    queryFn: () => getRegionVote(params),
    placeholderData: keepPreviousData,
    queryKey: [queryKeys.region.detail(params.regionId).queryKey, params],
  });

  return query;
};
