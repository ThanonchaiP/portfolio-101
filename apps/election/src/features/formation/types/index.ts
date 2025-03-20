import { z } from "zod";

import { PartyCount } from "@/types";

import { FormationSchema } from "../schemas";

export type Formation = z.infer<typeof FormationSchema>;

export type FormationDataSource = {
  government: PartyCount[];
  opposition: PartyCount[];
  other: PartyCount[];
};

export type Board = "government" | "opposition" | "other";
