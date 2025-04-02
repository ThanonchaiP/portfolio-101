"use client";

import { PropsWithChildren, useEffect, useState } from "react";

import { ResizablePanel, ResizablePanelGroup } from "../resizable";

import { DraggableWindow } from "./draggable-window";
import { FileSidebar } from "./file-sidebar";
import { Footerbar } from "./footerbar";
import { Tabs } from "./tabs";
import { Titlebar } from "./titlebar";

export const IDELayout = ({ children }: PropsWithChildren) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex min-h-screen w-screen items-center justify-center overflow-hidden p-0 md:p-4">
      <DraggableWindow>
        {/* Title bar */}
        <Titlebar />

        {/* IDE Content */}
        <div className="h-[calc(100%-3.5rem)]">
          {mounted && (
            <ResizablePanelGroup direction="horizontal">
              <div className="hidden min-w-[150px] max-w-[300px] flex-1 overflow-hidden lg:block">
                <FileSidebar />
              </div>
              <ResizablePanel defaultSize={80}>
                <div className="flex h-full flex-col">
                  <Tabs />
                  <div className="flex flex-1 overflow-y-auto bg-gray-800">
                    <main
                      className="size-full max-w-full overflow-x-hidden px-4"
                      style={{ scrollbarWidth: "thin" }}
                    >
                      {children}
                    </main>
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          )}
        </div>

        {/* Footer */}
        <Footerbar />
      </DraggableWindow>
    </div>
  );
};
