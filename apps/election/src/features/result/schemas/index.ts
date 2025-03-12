import { z } from "zod";

export const FormationSchema = z.object({
  id: z.string(),
  label: z.string(),
  name: z.string(),
  description: z.string(),
  governmentPartyRefCodes: z.array(z.string()),
  oppositionPartyRefCodes: z.array(z.string()),
  translations: z.object({
    th: z.object({ name: z.string() }),
    en: z.object({ name: z.string() }),
  }),
});

export const FormationResponseSchema = z.object({
  data: z.array(FormationSchema),
});
