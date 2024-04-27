"use client";

import React from "react";
import { ArrowIcon } from "./ui/daisyIcons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FilterBar() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams);
  const handleDelete = () => {
    params.delete("proteinerPerKr");
    params.delete("kalorierPerKr");
    params.delete("prosentProteinPerKalori");
    replace(`${pathname}?${params}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    params.delete("page");
    const formData = new FormData(e.currentTarget);
    const {
      proteinerPerKrMin,
      proteinerPerKrMax,
      kalorierPerKrMin,
      kalorierPerKrMax,
      prosentProteinPerKaloriMin,
      prosentProteinPerKaloriMax,
    } = Object.fromEntries(formData);

    // Legger til filtre i URL
    if (proteinerPerKrMin || proteinerPerKrMax) {
      params.set("proteinerPerKr", `${proteinerPerKrMin}-${proteinerPerKrMax}`);
    } else params.delete("proteinerPerKr");
    if (kalorierPerKrMax || kalorierPerKrMin) {
      params.set("kalorierPerKr", `${kalorierPerKrMin}-${kalorierPerKrMax}`);
    } else params.delete("kalorierPerKr");
    if (prosentProteinPerKaloriMax || prosentProteinPerKaloriMin) {
      params.set(
        "prosentProteinPerKalori",
        `${prosentProteinPerKaloriMin}-${prosentProteinPerKaloriMax}`
      );
    } else params.delete("prosentProteinPerKalori");

    replace(`${pathname}?${params}`);
  };

  return (
    <li>
      <details>
        <summary>Filter</summary>
        <ul className="p-2">
          <li>
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="flex flex-col justify-left"
            >
              {filterTyper.map((type, i) => (
                <React.Fragment key={i}>
                  <p className="text-xs">{type.title}</p>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      className="p-[10px] rounded-lg w-20 border border-primary focus:ring-1 focus:ring-offset-1 focus:ring-primary focus:outline-none"
                      placeholder="min"
                      name={`${type.objectKey}Min`}
                    />
                    <input
                      type="number"
                      className="p-[10px] rounded-lg w-20 border border-primary focus:ring-1 focus:ring-offset-1 focus:ring-primary focus:outline-none"
                      placeholder="max"
                      name={`${type.objectKey}Max`}
                    />
                  </div>
                </React.Fragment>
              ))}
              <div className="flex gap-5 mt-5">
                <button
                  type="button"
                  className="btn btn-sm btn-error"
                  onClick={handleDelete}
                >
                  Tøm
                </button>
                <button className="btn btn-sm btn-primary" type="submit">
                  Bruk
                </button>
              </div>
            </form>
          </li>
        </ul>
      </details>
    </li>
  );
}

const filterTyper = [
  {
    title: "Protein/kr",
    objectKey: "proteinerPerKr",
  },
  {
    title: "Kalorier/kr",
    objectKey: "kalorierPerKr",
  },
  {
    title: "Protein/kcal",
    objectKey: "prosentProteinPerKalori",
  },
  // {
  //   title: "Protein/kcal",
  //   objectKey: "prosentProteinPerKalori",
  // },
  // {
  //   title: "Protein/kcal",
  //   objectKey: "prosentProteinPerKalori",
  // },
  // {
  //   title: "Protein/kcal",
  //   objectKey: "prosentProteinPerKalori",
  // },
  // {
  //   title: "Protein/kcal",
  //   objectKey: "prosentProteinPerKalori",
  // },
  // {
  //   title: "Protein/kcal",
  //   objectKey: "prosentProteinPerKalori",
  // },
  // {
  //   title: "Protein/kcal",
  //   objectKey: "prosentProteinPerKalori",
  // },
];
