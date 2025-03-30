"use client";

import { PropsWithChildren } from "react";

import { DraggableWindow } from "./draggable-window";
import { FileSidebar } from "./file-sidebar";
import { FooterBar } from "./footer-bar";
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
            <div className="flex-[24.7_1_0px] overflow-hidden">
              <FileSidebar />
            </div>
            <div className="flex-[83.3_1_0px] overflow-hidden bg-[#1F2937]">
              {children}
            </div>
          </div>
        </div>

        {/* Footer */}
        <FooterBar />
      </DraggableWindow>
    </div>
  );
};
