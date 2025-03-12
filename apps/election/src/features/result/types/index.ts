import { z } from "zod";

import { FormationResponseSchema, FormationSchema } from "../schemas";

export type Formation = z.infer<typeof FormationSchema>;

export type FormationResponse = z.infer<typeof FormationResponseSchema>;
