import { clsx } from "clsx";
import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const cn = (...classes: (string | undefined)[]) => twMerge(clsx(classes));

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn("rounded bg-blue-500 px-4 py-2 text-white", className)}
      {...props}
    >
      {children}
    </button>
  );
};
