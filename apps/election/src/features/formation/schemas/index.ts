import { z } from "zod";

import { PartyCountSchema } from "@/features/geo";

export const FormationSchema = z.object({
  id: z.string(),
  label: z.string(),
  name: z.string(),
  description: z.string(),
  governmentPartyRefCodes: z.array(PartyCountSchema),
  oppositionPartyRefCodes: z.array(PartyCountSchema),
  otherPartyRefCodes: z.array(PartyCountSchema),
  translations: z.object({
    th: z.object({ name: z.string() }),
    en: z.object({ name: z.string() }),
  }),
});
