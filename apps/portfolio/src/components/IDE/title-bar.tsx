import { cn } from "@/lib/utils";

export const TitleBar = () => {
  return (
    <div
      className={cn(
        "handle flex h-8 cursor-move items-center justify-between border-b border-gray-800 bg-[#1f1f1f] px-3"
      )}
    >
      <div className="flex space-x-1.5">
        <div className="size-2.5 rounded-full bg-[#ff5f57]" />
        <div className="size-2.5 rounded-full bg-[#febc2e]" />
        <div className="size-2.5 rounded-full bg-[#28c840]" />
      </div>
      <div className="select-none text-xs text-white">Portfolio - VS Code</div>
      <div></div>
    </div>
  );
};
