import Link from "next/link";

type FormationItemProps = {
  id: string;
  label: string;
  totalSeats: number;
  imageUrl: string[];
};

export const FormationItem = ({
  id,
  label,
  imageUrl,
  totalSeats,
}: FormationItemProps) => {
  const [first = "", second = "", third = ""] = imageUrl;
  const imageList = [second, first, third];

  return (
    <Link
      href={`/formation/formula?id=${id}`}
      className="group flex cursor-pointer flex-col"
    >
      <div
        className="flex items-center justify-between bg-gray-800 px-4 py-3 text-white transition-colors group-hover:bg-[var(--primary)]"
        style={{
          clipPath:
            "polygon(0% 0%, calc(100% - 12px) 0%, 100% 12px, 100% 100%, 0% 100%)",
        }}
      >
        <h3 className="text-xl font-medium">{label}</h3>
        <div className="shrink-0 rounded bg-gray-500 px-2 py-1 font-medium text-white transition-colors group-hover:bg-[var(--background)] group-hover:text-[var(--primary)]">
          รวม {totalSeats} ที่นั่ง
        </div>
      </div>

      <div className="grid max-h-[250px] flex-1 grid-cols-[1fr_1.25fr_1fr] overflow-hidden">
        {imageList.map((image, index) => (
          <div key={index} className="relative w-full pt-[177%]">
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                background:
                  "linear-gradient(rgb(201, 189, 182) 0%, rgb(255, 245, 240) 100%)",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `url(${image}) center center / cover`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Link>
  );
};
