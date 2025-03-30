"use client";

import { PropsWithChildren } from "react";

import { DraggableWindow } from "./draggable-window";
import { FileSidebar } from "./file-sidebar";
import { FooterBar } from "./footer-bar";
import { Tabs } from "./tabs";
import { TitleBar } from "./title-bar";

export const IDELayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center overflow-hidden p-0 md:p-4">
      <DraggableWindow>
        {/* Title bar */}
        <TitleBar />

        {/* IDE Content */}
        <div className="h-[calc(100%-3.5rem)]">
          <div className="flex size-full overflow-hidden">
            <div className="hidden min-w-[150px] max-w-[300px] flex-1 overflow-hidden lg:block">
              <FileSidebar />
            </div>
            <div className="flex size-full flex-col lg:flex-1">
              <Tabs />
              <div className="flex flex-1 overflow-y-auto bg-gray-800">
                <main className="w-full max-w-full overflow-x-hidden px-4 pt-4">
                  {children}
                </main>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <FooterBar />
      </DraggableWindow>
    </div>
  );
};
