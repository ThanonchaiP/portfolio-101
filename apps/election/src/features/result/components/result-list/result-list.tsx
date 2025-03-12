import { useGetPartyCount } from "@/features/geo";

export const ResultList = () => {
  const { data } = useGetPartyCount({ regionId: "geo" });

  console.log(data);

  return (
    <div className="flex-1">
      <h1>Result List</h1>
    </div>
  );
};
