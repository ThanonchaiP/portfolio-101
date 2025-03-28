"use client";

import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

import { Sidebar } from "../sidebar";

type MainLayoutProps = PropsWithChildren;

export const MainLayout = ({ children }: MainLayoutProps) => {
  const pathname = usePathname();

  return (
    <main
      className={cn(
        "flex flex-col gap-7 p-[0px_0px_120px] lg:h-screen lg:p-8 lg:pt-4 xl:flex-row xl:gap-0 xl:pt-8",
        pathname.startsWith("/geo") && "lg:h-auto xl:h-screen",
      )}
    >
      <Sidebar />
      <div className="flex-1 px-4 lg:h-full lg:p-0 xl:pl-6">{children}</div>
    </main>
  );
};
