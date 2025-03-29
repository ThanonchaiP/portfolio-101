"use client";

import { useState, useEffect, PropsWithChildren } from "react";
import { Rnd } from "react-rnd";

import { cn } from "@/lib/utils";

type DraggableWindowProps = PropsWithChildren;

export function DraggableWindow({ children }: DraggableWindowProps) {
  const [mounted, setMounted] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const [size, setSize] = useState({
    width: 1600,
    height: 900,
  });

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      const isLg = window.innerWidth >= 1024; // lg breakpoint
      setIsLargeScreen(isLg);

      if (isLg) {
        const padding = 128; // Reduced padding
        const maxWidth = Math.min(window.innerWidth - padding, 1600);
        const maxHeight = Math.min(window.innerHeight - 64, 900);

        setSize({
          width: maxWidth,
          height: maxHeight,
        });
      } else {
        // Full screen for mobile
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const commonStyles = cn(
    "overflow-hidden bg-[#1e1e1e] shadow-md shadow-blue-900",
    isLargeScreen ? "rounded-lg border border-gray-800" : ""
  );

  if (!mounted) {
    return (
      <div
        data-ide-window
        style={{
          width: isLargeScreen ? size.width : "100vw",
          height: isLargeScreen ? size.height : "100vh",
        }}
        className={commonStyles}
      >
        {children}
      </div>
    );
  }

  if (!isLargeScreen) {
    return (
      <div
        data-ide-window
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        className={commonStyles}
      >
        {children}
      </div>
    );
  }

  return (
    <Rnd
      default={{
        x: (window.innerWidth - size.width) / 2,
        y: (window.innerHeight - size.height) / 2,
        width: size.width,
        height: size.height,
      }}
      size={size}
      minWidth={Math.min(800, window.innerWidth - 64)}
      minHeight={600}
      bounds="parent"
      dragHandleClassName="handle"
      resizeHandleStyles={{
        bottom: { cursor: "row-resize" },
        bottomLeft: { cursor: "sw-resize" },
        bottomRight: { cursor: "se-resize" },
        left: { cursor: "col-resize" },
        right: { cursor: "col-resize" },
        top: { cursor: "row-resize" },
        topLeft: { cursor: "nw-resize" },
        topRight: { cursor: "ne-resize" },
      }}
      onResize={(e, direction, ref) => {
        setSize({
          width: ref.offsetWidth,
          height: ref.offsetHeight,
        });
      }}
      className={commonStyles}
      data-ide-window
    >
      <>{children}</>
    </Rnd>
  );
}
