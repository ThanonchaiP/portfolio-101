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
    left: "md:size-[64px] size-[54px]",
    center: "md:size-[74px] size-[54px]",
    right: "md:size-[64px] size-[54px]",
  };

  const textStyles = {
    left: "md:h-[30px] md:text-3xl",
    center: "md:h-[36px] md:text-4xl",
    right: "md:h-[30px] md:text-3xl",
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
              className={`${textStyles[position]} text-lg font-bold text-[var(--primary)]`}
            >
              {seatCount}
            </h3>
            <p className="text-sm text-[var(--primary)] md:text-base">
              ที่นั่ง
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
