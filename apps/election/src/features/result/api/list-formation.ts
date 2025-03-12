import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

import { API_URL } from "@/config";
import { queryKeys } from "@/lib/query-keys";

import { FormationResponseSchema } from "../schemas";
import { FormationResponse } from "../types";

export const listFormation = async (): Promise<FormationResponse> => {
  const { data } = await axios.get(`/formation`, {
    baseURL: API_URL,
  });

  return FormationResponseSchema.parse(data);
};

export const useListFormation = () => {
  const query = useQuery({
    queryFn: listFormation,
    placeholderData: keepPreviousData,
    queryKey: [queryKeys.formation.all.queryKey],
  });

  return query;
};
