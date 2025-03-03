import parties from "@/data/parties.json";
import { Party } from "@/types";

export const dynamic = "force-static";

export async function GET() {
  const data = parties.reduce((acc: Record<string, Party>, curr) => {
    acc[curr.id] = curr;
    return acc;
  }, {});

  return Response.json({ data });
}
