import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

import { API_URL } from "@/config";
import { queryKeys } from "@/lib/query-keys";
import { PartyCount } from "@/types";

import { PartyCountResponseSchema } from "../schemas";

type GetPartyCount = {
  regionId: string;
};

export const getPartyCount = async ({
  regionId,
}: GetPartyCount): Promise<PartyCount[]> => {
  const { data } = await axios.get(`/regions/${regionId}/party-count`, {
    baseURL: API_URL,
  });

  return PartyCountResponseSchema.parse(data.data);
};

export const useGetPartyCount = (params: GetPartyCount) => {
  const query = useQuery({
    queryFn: () => getPartyCount(params),
    placeholderData: keepPreviousData,
    queryKey: [queryKeys.region.partyCount(params.regionId).queryKey, params],
  });

  return query;
};
