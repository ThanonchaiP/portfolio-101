import { z } from "zod";

export const RegionVoteSchema = z.object({
  id: z.string(),
  alias: z.string(),
  name_th: z.string(),
  name_en: z.string(),
  constituency: z.number(),
  votes: z.record(
    z.string(),
    z.array(
      z.object({
        id: z.string(),
        vote_count: z.number(),
        district: z.object({
          id: z.string(),
          name_th: z.string(),
          name_en: z.string(),
          province_id: z.string(),
        }),
        candidate: z.object({
          id: z.string(),
          name_th: z.string(),
          name_en: z.string(),
          partyId: z.string(),
          image: z.string(),
          party: z.object({
            id: z.string(),
            name_th: z.string(),
            name_en: z.string(),
            image: z.string(),
            color: z.string(),
          }),
        }),
      }),
    ),
  ),
});

export const RegionVoteResponseSchema = z.object({
  data: z.array(RegionVoteSchema),
});
