"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";

export const FooterBar = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 flex h-6 items-center justify-between border-t border-gray-800 bg-[#1f1f1f] px-3 text-[11px] text-white">
      <div className="flex items-center gap-3">
        <Link
          href="https://github.com/ThanonchaiP"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-gray-300"
        >
          <Icon icon="ion:git-branch-outline" fontSize={14} />
          <span>main</span>
        </Link>
        <p className="flex items-center gap-1 hover:text-gray-300">
          <Icon icon="material-symbols:cancel-outline-rounded" fontSize={14} />
          <span className="pt-0.5">0</span>
        </p>
        <p className="flex items-center gap-1 hover:text-gray-300">
          <Icon icon="material-symbols:warning-outline-rounded" fontSize={14} />
          <span className="pt-0.5">0</span>
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span>UTF-8</span>
        <span>LF</span>
        <div className="flex items-center gap-1">
          <Icon icon="material-symbols:check-rounded" fontSize={14} />
          <span>Prettier</span>
        </div>
      </div>
    </div>
  );
};
