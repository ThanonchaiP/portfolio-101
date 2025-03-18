import { z } from "zod";

import { PartyCount } from "@/types";

import { FormationSchema } from "../schemas";

export type Formation = z.infer<typeof FormationSchema>;

export type FormationDataSource = {
  governmentPartyRefCodes: PartyCount[];
  oppositionPartyRefCodes: PartyCount[];
  otherPartyRefCodes: PartyCount[];
};
