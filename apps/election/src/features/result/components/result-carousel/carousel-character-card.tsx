type CarouselCharacterCardProps = {
  image: string;
  seatCount: number;
  position?: "left" | "center" | "right";
};

export const CarouselCharacterCard = ({
  image = "",
  seatCount = 0,
  position = "left",
}: CarouselCharacterCardProps) => {
  const positionStyles = {
    left: "bottom-7 left-0",
    center: "bottom-9 left-6",
    right: "bottom-7 right-0",
  };

  const sizeStyles = {
    left: "size-[64px]",
    center: "size-[74px]",
    right: "size-[64px]",
  };

  const textStyles = {
    left: "h-[30px] text-3xl",
    center: "h-[36px] text-4xl",
    right: "h-[30px] text-3xl",
  };

  return (
    <div className="relative w-full border border-gray-300 pt-[177%]">
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          background:
            "linear-gradient(rgb(201, 189, 182) 0%, rgb(255, 245, 240) 100%)",
        }}
      >
        <div className="relative flex size-full items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${image})`,
            }}
          ></div>
          <div
            className={`absolute ${positionStyles[position]} flex ${sizeStyles[position]} flex-col justify-center bg-slate-50 text-center`}
          >
            <h3
              className={`${textStyles[position]} font-bold text-[var(--primary)]`}
            >
              {seatCount}
            </h3>
            <p className="text-[var(--primary)]">ที่นั่ง</p>
          </div>
        </div>
      </div>
    </div>
  );
};
