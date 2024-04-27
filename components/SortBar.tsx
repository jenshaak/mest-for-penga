"use client";

import React from "react";
import { ArrowIcon } from "./ui/daisyIcons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SortBar() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams);

  const handleClick = (cat: string) => {
    if (cat === "slett") params.delete("sort");
    else {
      params.delete("page");
      params.set("sort", cat);
      replace(`${pathname}?${params}`);
    }
    replace(`${pathname}?${params}`);
  };

  return (
    <li>
      <details>
        <summary>Sortér</summary>
        <ul className="p-2">
          <li>
            <button onClick={() => handleClick("slett")}>Ingen</button>
          </li>
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
            <button onClick={() => handleClick("prosentProteinPerKalori")}>
              Protein/kalori
            </button>
          </li>
          <li>
            <button onClick={() => handleClick("priser.0.prisPerKg")}>
              Kg/kr
            </button>
          </li>
          <li>
            <button onClick={() => handleClick("næringsinnhold.kalorier")}>
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
  );
}
