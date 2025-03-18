import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

import { API_URL } from "@/config";
import { queryKeys } from "@/lib/query-keys";

import { FormationSchema } from "../schemas";
import { Formation } from "../types";

export const getFormation = async (formationId: string): Promise<Formation> => {
  const { data } = await axios.get(`/formation/${formationId}`, {
    baseURL: API_URL,
  });
  return FormationSchema.parse(data.data);
};

type useGetFormation = {
  formationId: string;
};

export const useGetFormation = ({ formationId }: useGetFormation) => {
  const query = useQuery({
    queryFn: () => getFormation(formationId),
    placeholderData: keepPreviousData,
    queryKey: [queryKeys.formation.detail(formationId).queryKey],
  });
  return query;
};
