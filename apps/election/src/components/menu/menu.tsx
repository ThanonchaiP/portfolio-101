import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export const Menu = () => {
  const pathname = usePathname();

  const navItems = [
    { title: "ภาพรวม", href: "/" },
    { title: "รายเขต", href: "/geo" },
    { title: "ส.ส. ทั้งหมด", href: "/parliament" },
    { title: "จับขั้วรัฐบาล", href: "/formation" },
  ];

  const subNavItems = [
    {
      title: "ชมสด Multi-View",
      href: "/multi-view",
      icon: "material-symbols:tv-gen-outline",
    },
    {
      title: "รวมข่าวเลือกตั้ง",
      href: "/",
      icon: "material-symbols:format-list-bulleted",
    },
    {
      title: "เว็บไซต์หลัก Thailand",
      href: "/thailand",
      icon: "material-symbols:dataset-linked-outline",
    },
  ];

  return (
    <div className="flex flex-1 flex-col gap-6 pt-14">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "w-fit bg-[#FBFBFB] px-6 py-[6px] text-[21px] font-medium hover:bg-[var(--primary)] hover:text-white",
            pathname === item.href ? "bg-[var(--primary)] text-white" : "",
          )}
          style={{
            clipPath:
              "polygon(0% 0%, calc(100% - 12px) 0%, 100% 12px, 100% 100%, 12px 100%, 0% calc(100% - 12px))",
          }}
        >
          {item.title}
        </Link>
      ))}
      <div className="flex flex-col gap-[10px]">
        {subNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-1 text-sm hover:text-[var(--primary)] hover:underline"
          >
            <Icon icon={item.icon} className="text-lg" />
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};
