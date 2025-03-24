import { PropsWithChildren } from "react";

import { Sidebar } from "../sidebar";

type MainLayoutProps = PropsWithChildren;

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main className="flex flex-col gap-7 p-[0px_0px_120px] md:bg-red-300 lg:h-screen lg:bg-blue-300 lg:p-8 lg:pt-4 xl:flex-row xl:gap-0 xl:bg-green-300 xl:pt-8">
      <Sidebar />
      <div className="flex-1 px-4 lg:h-full lg:p-0 xl:pl-6">{children}</div>
    </main>
  );
};
