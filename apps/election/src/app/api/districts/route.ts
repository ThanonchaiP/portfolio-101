import districts from "@/data/districts.json";
import { District } from "@/types";

export const dynamic = "force-static";

export async function GET() {
  const data = districts.reduce((acc: Record<string, District>, curr) => {
    acc[curr.id] = curr;
    return acc;
  }, {});

  return Response.json({ data });
}
