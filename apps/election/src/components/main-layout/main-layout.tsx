import { PropsWithChildren } from "react";

import { Sidebar } from "../sidebar";

type MainLayoutProps = PropsWithChildren;

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main className="flex h-screen p-8">
      <Sidebar />
      <div className="flex-1 pl-6">{children}</div>
    </main>
  );
};
