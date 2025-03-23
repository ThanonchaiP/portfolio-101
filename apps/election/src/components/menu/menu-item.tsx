import Link from "next/link";

import { useBreakpoint } from "@/hooks/use-breakpoint";
import { cn } from "@/lib/utils";

type MenuItemProps = {
  title: string;
  href: string;
  pathname: string;
};

export const MenuItem = ({ href, title, pathname }: MenuItemProps) => {
  const breakpoint = useBreakpoint();

  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      key={href}
      href={href}
      className={cn(
        "w-fit whitespace-nowrap border-b-2 border-transparent px-3 py-[6px] font-medium hover:border-[var(--primary)] lg:border-0 lg:bg-[#FBFBFB] lg:px-6 lg:hover:bg-[var(--primary)] lg:hover:text-white xl:text-[21px]",
        isActive
          ? "border-b-2 border-[var(--primary)] text-[var(--primary)] lg:border-0 lg:bg-[var(--primary)] lg:text-white"
          : "",
      )}
      style={{
        ...(!["sm", "md"].includes(breakpoint ?? "lg") && {
          clipPath:
            "polygon(0% 0%, calc(100% - 12px) 0%, 100% 12px, 100% 100%, 12px 100%, 0% calc(100% - 12px))",
        }),
      }}
    >
      {title}
    </Link>
  );
};
