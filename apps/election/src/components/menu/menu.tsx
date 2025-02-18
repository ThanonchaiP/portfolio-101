import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { MenuItem } from "./menu-item";

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

export const Menu = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-1 flex-col gap-6 pt-14">
      {navItems.map((item) => (
        <MenuItem key={item.href} {...item} pathname={pathname} />
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
