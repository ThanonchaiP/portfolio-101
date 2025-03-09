import { z } from "zod";

import {
  RegionVoteSchema,
  RegionVoteResponseSchema,
  RegionVoteValueSchema,
} from "../schemas";

export type RegionVote = z.infer<typeof RegionVoteSchema>;

export type RegionVoteResponse = z.infer<typeof RegionVoteResponseSchema>;

export type RegionVoteValue = z.infer<typeof RegionVoteValueSchema>;
