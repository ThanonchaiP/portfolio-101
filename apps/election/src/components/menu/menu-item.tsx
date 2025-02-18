import Link from "next/link";

import { cn } from "@/lib/utils";

type MenuItemProps = {
  title: string;
  href: string;
  pathname: string;
};

export const MenuItem = ({ href, title, pathname }: MenuItemProps) => {
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      key={href}
      href={href}
      className={cn(
        "w-fit bg-[#FBFBFB] px-6 py-[6px] text-[21px] font-medium hover:bg-[var(--primary)] hover:text-white",
        isActive ? "bg-[var(--primary)] text-white" : "",
      )}
      style={{
        clipPath:
          "polygon(0% 0%, calc(100% - 12px) 0%, 100% 12px, 100% 100%, 12px 100%, 0% calc(100% - 12px))",
      }}
    >
      {title}
    </Link>
  );
};
