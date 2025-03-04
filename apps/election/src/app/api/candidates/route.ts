import axios from "axios";

import { API_URL } from "@/config";
import candidates from "@/data/candidates.json";
import { Candidate } from "@/types";

export async function GET() {
  const host = API_URL;

  const parties = (await axios.get(`${host}/parties`)).data.data;

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
