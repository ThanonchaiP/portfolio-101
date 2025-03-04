export const dynamic = "force-static";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ regionId: string }> },
) {
  console.log(params);
  const data = {
    data: [
      {
        id: 1,
        title: "Hello World",
        body: "This is a post",
      },
    ],
  };

  return Response.json(data);
}
