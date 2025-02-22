export const GeoPartyCount = () => {
  return (
    <div className="mt-2">
      <h3 className="text-[21px]">ผลคะแนน</h3>

      <div className="mt-4 flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <h3>เพื่อไทย</h3>
          </div>
          <h3 className="text-sm text-[var(--primary)]">
            <span className="text-[21px] font-bold">112</span> ที่นั่ง
          </h3>
        </div>
      </div>
    </div>
  );
};
