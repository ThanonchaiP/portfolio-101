import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";

import { useTabsStore } from "@/app/store";
import { cn } from "@/lib/utils";
import { Tab } from "@/types";

type FileItem = Tab;

type FolderItem = {
  name: string;
  files: FileItem[];
};

export const FileSidebar = () => {
  const { activeTab, addTab } = useTabsStore();

  const [expandedFolders, setExpandedFolders] = useState<{
    [key: string]: boolean;
  }>({
    Portfolio: true,
    "Other Cool Stuff": true,
  });

  const toggleFolder = (folderName: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };

  const portfolioFiles: FileItem[] = [
    {
      name: "home.html",
      icon: "skill-icons:html",
      path: "/",
    },
    {
      name: "about.tsx",
      icon: "skill-icons:react-dark",
      path: "/about",
    },
    {
      name: "projects.css",
      icon: "skill-icons:css",
      path: "/projects",
    },
    {
      name: "contact.json",
      icon: "vscode-icons:file-type-light-json",
      path: "/contact",
    },
    {
      name: "work-experience.md",
      icon: "catppuccin:markdown",
      path: "/experience",
    },
  ];

  // const otherFiles: FileItem[] = [
  //   {
  //     name: "coding-stats.env",
  //     icon: "skill-icons:html",
  //     path: "/stats",
  //   },
  //   {
  //     name: "guest-book.tsx",
  //     icon: "skill-icons:html",
  //     path: "/guestbook",
  //   },
  //   {
  //     name: "git-history.git",
  //     icon: "skill-icons:html",
  //     path: "/history",
  //   },
  // ];

  const folders: FolderItem[] = [
    { name: "Portfolio", files: portfolioFiles },
    // { name: "Other Cool Stuff", files: otherFiles },
  ];

  return (
    <div className="size-full max-w-[290px] overflow-y-auto border-r border-gray-800 bg-[#1e1e1e] p-3 text-sm">
      {folders.map((folder) => (
        <div key={folder.name} className="mb-2">
          <div
            className="flex cursor-pointer items-center px-2 py-1 text-gray-400 hover:text-gray-300"
            onClick={() => toggleFolder(folder.name)}
          >
            {expandedFolders[folder.name] ? (
              <Icon
                icon="mingcute:down-line"
                fontSize={16}
                className="mr-1 text-gray-400"
              />
            ) : (
              <Icon
                icon="mingcute:right-line"
                fontSize={16}
                className="mr-1 text-gray-400"
              />
            )}
            <span className="truncate">{folder.name}</span>
          </div>

          {expandedFolders[folder.name] && (
            <div className="ml-4 border-l border-gray-400">
              {folder.files.map((file) => (
                <Link
                  key={file.path}
                  href={file.path}
                  onClick={() => addTab(file)}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 px-2 py-1 pl-4 text-gray-400 hover:text-gray-300",
                    activeTab === file.path && "text-gray-100"
                  )}
                >
                  <Icon icon={file.icon} className="shrink-0" fontSize={16} />
                  <span className="truncate">{file.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
