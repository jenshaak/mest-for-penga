"use client";

import React from "react";
import { ArrowIcon } from "./ui/daisyIcons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FilterBar() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams);

  const handleClick = (cat: string) => {
    params.set("sort", cat);
    replace(`${pathname}?${params}`);
  };

  return (
    <div className="navbar bg-base-100 flex justify-center">
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <details>
              <summary>Sort by</summary>
              <ul className="p-2">
                <li>
                  <button onClick={() => handleClick("proteinerPerKr")}>
                    Proteiner/kr
                  </button>
                </li>
                <li>
                  <button onClick={() => handleClick("kalorierPerKr")}>
                    Kalorier/kr
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleClick("prosentProteinPerKalori")}
                  >
                    Protein/kalori
                  </button>
                </li>
                <li>
                  <button onClick={() => handleClick("priser.0.prisPerKg")}>
                    Kg/kr
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleClick("næringsinnhold.kalorier")}
                  >
                    Kalorier
                  </button>
                </li>
                <li>
                  <button onClick={() => handleClick("næringsinnhold.protein")}>
                    protein
                  </button>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
