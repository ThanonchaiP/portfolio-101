"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { useBreakpoint } from "@/hooks/use-breakpoint";
import { cn } from "@/lib/utils";
import { useTabsStore } from "@/store";
import { Tab } from "@/types";

const NAVIGATION_ITEMS: Tab[] = [
  {
    name: "home.html",
    icon: "skill-icons:html",
    path: "/",
  },
  {
    name: "about.tsx",
    icon: "skill-icons:react-dark",
    path: "/about",
  },
  {
    name: "projects.css",
    icon: "skill-icons:css",
    path: "/projects",
  },
  {
    name: "contact.json",
    icon: "vscode-icons:file-type-light-json",
    path: "/contact",
  },
  {
    name: "work-experience.md",
    icon: "catppuccin:markdown",
    path: "/experience",
  },
];

export const Tabs = () => {
  const pathname = usePathname();
  const breakpoint = useBreakpoint();
  const { openTabs, activeTab, removeTab, setActiveTab } = useTabsStore();

  const isMobile = ["sm", "md"].includes(breakpoint ?? "");

  useEffect(() => {
    setActiveTab(pathname);
  }, [setActiveTab, pathname]);

  return (
    <div className="sticky top-0 z-10 border-b border-gray-800 bg-[#1e1e1e]">
      <div
        className="flex w-full overflow-x-auto"
        style={{ scrollbarWidth: "thin" }}
      >
        {(isMobile ? NAVIGATION_ITEMS : openTabs).map((tab) => (
          <div
            key={tab.path}
            className={cn(
              "group flex shrink-0 items-center gap-1 text-xs hover:bg-gray-800 hover:text-white",
              activeTab === tab.path
                ? "bg-gray-800 text-white"
                : "text-gray-300"
            )}
          >
            <Link
              href={tab.path}
              key={tab.path}
              onClick={() => setActiveTab(tab.path)}
              className={cn(
                "flex items-center gap-1 py-2 pl-3",
                isMobile && "pr-3"
              )}
            >
              <Icon icon={tab.icon} fontSize={16} />
              {tab.name}
            </Link>
            {!isMobile && (
              <Icon
                icon="ix:cancel"
                className={cn(
                  "text-gray-300 opacity-0 group-hover:opacity-100 mr-3 cursor-pointer",
                  activeTab === tab.path && "opacity-100"
                )}
                fontSize={14}
                onClick={() => removeTab(tab.path)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
