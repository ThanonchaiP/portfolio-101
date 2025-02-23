import { cn } from "@/lib/utils";

export const GeoVoteList = () => {
  return (
    <div className="flex max-h-full flex-col">
      <div className="bg-[#E5E4E3] p-[10px]">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="ค้นหาจากชื่อจังหวัด/เขต"
            className="w-full border px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
          <svg
            className="absolute right-3 top-2.5 size-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M16.5 10.5a6 6 0 1 0-12 0 6 6 0 0 0 12 0z"
            ></path>
          </svg>
        </div>
      </div>

      <h3 className="text-[var(--primary)]">ภาคกลาง (75)</h3>
      <div className="custom-scrollbar h-full max-h-full overflow-y-auto">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="cursor-pointer border-b border-gray-300 bg-white pb-2 pl-[14px] pr-2 pt-4 transition-colors hover:bg-[#FAF2EC]"
          >
            <div className="flex items-center justify-between text-[var(--primary)]">
              <h3>กาญจนบุรี เขต 1</h3>
              <h3 className="text-sm">
                ห่างกัน <strong>7,463</strong>
              </h3>
            </div>
            <div className="mt-2 flex flex-col">
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h4 className="text-lg font-semibold text-gray-700">
                      {index + 1}
                    </h4>
                    <h4>อัครนันท์ กัณณ์กิตตินันท์</h4>
                  </div>
                  <h4
                    className={cn(
                      "text-[21px] font-bold text-gray-700",
                      index > 0 && "text-gray-400",
                    )}
                  >
                    33,183
                  </h4>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
