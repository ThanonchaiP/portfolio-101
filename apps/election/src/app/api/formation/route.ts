import formation from "@/data/formations.json";

export const dynamic = "force-static";

export async function GET() {
  const data = formation;
  return Response.json({ data });
}
