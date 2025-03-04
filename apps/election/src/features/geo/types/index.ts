import { z } from "zod";

import { RegionVoteSchema, RegionVoteResponseSchema } from "../schemas";

export type RegionVote = z.infer<typeof RegionVoteSchema>;

export type RegionVoteResponse = z.infer<typeof RegionVoteResponseSchema>;
