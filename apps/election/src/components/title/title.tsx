import clsx from "clsx";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const cn = (...classes: (string | undefined)[]) => twMerge(clsx(classes));

type TitleProps = HTMLAttributes<HTMLDivElement> & {
  label: string;
};

export const Title = ({ label, className, ...props }: TitleProps) => {
  return (
    <div
      className={cn(
        "w-fit border-l-8 border-solid border-[var(--primary)] bg-gray-800 px-3 py-[10px] text-xl text-white",
        className,
      )}
      style={{
        clipPath:
          "polygon(0% 0%, calc(100% - 12px) 0%, 100% 12px, 100% 100%, 0% 100%)",
      }}
      {...props}
    >
      {label}
    </div>
  );
};
