import { PropsWithChildren } from "react";

import { DraggableWindow } from "./draggable-window";
import { FooterBar } from "./footer-bar";
import { TitleBar } from "./title-bar";

export const IDELayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center overflow-hidden p-0 md:p-4">
      <DraggableWindow>
        {/* Title bar */}
        <TitleBar />

        {/* IDE Content */}
        <div className="h-[calc(100%-3.5rem)]">{children}</div>

        {/* Footer */}
        <FooterBar />
      </DraggableWindow>
    </div>
  );
};
