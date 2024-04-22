"use client";

import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { KategoriType } from "@/typings";

export default function CategoriesBar({
  kategorier,
}: {
  kategorier: KategoriType[];
}) {
  const [openCat, setOpenCat] = useState("");
  const [subCat, setSubCat] = useState("");
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams);

  const handleAlle = () => {
    setOpenCat("");
    params.delete("cat");
    params.delete("q");
    replace(`${pathname}?${params}`);
  };

  const handleClick = (cat: string, sub?: boolean) => {
    if (!sub) {
      setOpenCat(cat);
      setSubCat("");
    } else setSubCat(cat);
    params.delete("q");
    params.set("cat", cat);
    replace(`${pathname}?${params}`);
  };

  return (
    <div className="px-5">
      <h4>Kategorier</h4>
      <ul className="mt-3">
        <li onClick={() => handleAlle()}>
          <div
            className={`${
              openCat === "" && "text-black dark:text-white"
            } cursor-pointer hover:bg-base-300 p-2 rounded-lg`}
          >
            Alle kategorier
          </div>
        </li>
        {kategorier?.map((kat, i) => (
          <li key={i}>
            <div
              onClick={() => handleClick(kat.title!)}
              className={`${
                openCat === kat.title && "text-black dark:text-white"
              } cursor-pointer hover:bg-base-300 p-2 rounded-lg`}
            >
              {kat.title}
            </div>
            {openCat === kat.title && (
              <ul className="text-sm ml-4">
                {kat.underKategorier?.map((underKat) => (
                  <li key={underKat}>
                    <div
                      onClick={() => handleClick(underKat, true)}
                      className={`${
                        subCat === underKat && "text-black dark:text-white"
                      } cursor-pointer hover:bg-base-300 p-2 rounded-lg`}
                    >
                      {underKat}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
