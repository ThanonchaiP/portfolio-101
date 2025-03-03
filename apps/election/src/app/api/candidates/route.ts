import axios from "axios";

import candidates from "@/data/candidates.json";
import { Candidate } from "@/types";

export const dynamic = "force-static";

export async function GET(request: Request) {
  const host = request.url.replace(/\/api\/candidates*/, "");

  const parties = (await axios.get(`${host}/api/parties`)).data.data;

  const candidateParty = candidates.map((candidate) => {
    const party = parties[candidate.partyId];
    return { ...candidate, party };
  });

  const data = candidateParty.reduce((acc: Record<string, Candidate>, curr) => {
    acc[curr.id] = curr;
    return acc;
  }, {});

  return Response.json({ data });
}
