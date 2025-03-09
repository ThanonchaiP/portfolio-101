import axios from "axios";

import regions from "@/data/regions.json";
import region1 from "@/data/votes/region-1.json";
import region2 from "@/data/votes/region-2.json";
import region3 from "@/data/votes/region-3.json";
import region5 from "@/data/votes/region-5.json";
import region6 from "@/data/votes/region-6.json";
import region7 from "@/data/votes/region-7.json";
import { Vote } from "@/types";

export const dynamic = "force-static";

const REGION_FILES: Record<string, Vote[]> = {
  "1": region1,
  "2": region2,
  "3": region3,
  "5": region5,
  "6": region6,
  "7": region7,
};

const getVotes = (regionId: string): Vote[] => {
  return REGION_FILES[regionId] ?? [];
};

const groupById = (data: Vote[]): Record<string, Vote[]> => {
  return data.reduce(
    (acc, vote) => {
      acc[vote.district_id] = acc[vote.district_id] || [];
      acc[vote.district_id].push(vote);
      return acc;
    },
    {} as Record<string, Vote[]>,
  );
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ regionId: string }> },
) {
  const regionId = (await params).regionId;
  const host = new URL(request.url).origin;

  const region = regions.find((region) => region.id === regionId) ?? [];

  const votes = await getVotes(regionId);
  const votesObj = groupById(votes);

  const [{ data: districts }, { data: candidates }] = await Promise.all([
    axios.get(`${host}/api/districts`),
    axios.get(`${host}/api/candidates`),
  ]);

  //sort votes by vote_count
  Object.values(votesObj).forEach((voteGroup) => {
    voteGroup.sort((a, b) => b.vote_count - a.vote_count);
    voteGroup.length = Math.min(voteGroup.length, 2); // Keep only top 2 items

    voteGroup.forEach((vote) => {
      vote.district = districts.data[vote.district_id];
      vote.candidate = candidates.data[vote.candidate_id];
    });
  });

  const data = {
    data: {
      ...region,
      votes: votesObj,
    },
  };

  return Response.json(data);
}
