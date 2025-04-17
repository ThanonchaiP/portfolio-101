import Link from "next/link";

import { useTabsStore } from "@/store";

const RESUME_URL =
  "https://drive.google.com/file/d/14H-r6cvyV6jTFgrvolgHgGqmgjkfK1mM/view?usp=drive_link";

export const HomeNavigation = () => {
  const addTab = useTabsStore((state) => state.addTab);

  return (
    <div className="flex space-x-4">
      <Link
        href="/about"
        onClick={() =>
          addTab({
            name: "about.tsx",
            icon: "skill-icons:react-dark",
            path: "/about",
          })
        }
        className="rounded bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700 md:text-base"
      >
        About Me
      </Link>
      <Link
        href={RESUME_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer rounded border border-gray-300 px-4 py-2 text-sm text-gray-300 transition-colors hover:bg-blue-950 md:text-base"
      >
        Resume
      </Link>
    </div>
  );
};
