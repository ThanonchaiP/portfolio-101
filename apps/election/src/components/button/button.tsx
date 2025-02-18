import { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

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
