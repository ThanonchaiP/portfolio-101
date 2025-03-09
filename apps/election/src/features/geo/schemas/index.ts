import { z } from "zod";

export const RegionVoteValueSchema = z.object({
  id: z.string(),
  candidate_id: z.string().optional(),
  district_id: z.string().optional(),
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
});

export const RegionVoteSchema = z.object({
  id: z.string(),
  alias: z.string(),
  name_th: z.string(),
  name_en: z.string(),
  constituency: z.number(),
  votes: z.record(z.string(), z.array(RegionVoteValueSchema)),
});

export const RegionVoteResponseSchema = z.object({
  data: RegionVoteSchema,
});

export const PartyCountResponseSchema = z.any(
  z.object({
    name: z.string(),
    count: z.number(),
    image: z.string(),
  }),
);
