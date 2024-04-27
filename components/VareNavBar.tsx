"use client";

import React from "react";
import { ArrowIcon } from "./ui/daisyIcons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SortBar from "./SortBar";
import FilterBar from "./FilterBar";
import Search from "./Search";

export default function VareNavBar() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams);

  const handleClick = (cat: string) => {
    params.delete("page");
    params.set("sort", cat);
    replace(`${pathname}?${params}`);
  };

  return (
    <div className="navbar flex justify-center w-full">
      <div className="navbar-start"></div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <SortBar />
          <FilterBar />
        </ul>
      </div>
      <div className="navbar-end">
        <Search placeholder="søk..." />
      </div>
    </div>
  );
}
