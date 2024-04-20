"use client";

import { EnterIcon, ExitIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const pages = [
  {
    title: "kalorier-per-krone",
    path: "/kalorier-per-krone",
  },
  {
    title: "kg-per-krone",
    path: "/kg-per-krone",
  },
  {
    title: "Protein per krone",
    path: "/protein-per-krone",
  },
];

function SideBar() {
  const pathname = usePathname();

  return (
    <div className="flex-col justify-between bg-base-100 min-h-[100vh] w-full p-3">
      <div className="flex flex-col space-y-5">
        <h3>Username</h3>
        <div className="flex flex-col space-y-2">
          {pages.map((page, i) => (
            <Link
              key={i}
              href={page.path}
              className={
                pathname === page.path
                  ? "p-3 bg-neutral/30 rounded-lg"
                  : "p-3 hover:bg-neutral-content rounded-lg"
              }
            >
              {page.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
