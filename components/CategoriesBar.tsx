"use client";

import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { KategoriType } from "@/typings";

type Props = {
  kategorier: KategoriType[];
  currentCat: string;
};

export default function CategoriesBar({ kategorier, currentCat }: Props) {
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
    params.delete("page");
    replace(`${pathname}?${params}`);
  };

  const handleClick = (cat: string, sub?: boolean) => {
    if (!sub) {
      setOpenCat(cat);
      setSubCat("");
    } else setSubCat(cat);
    params.delete("q");
    params.delete("page");
    params.set("cat", cat);
    replace(`${pathname}?${params}`);
  };

  return (
    <div className="px-8 pt-24 border-base-300 border-r-2">
      <h4>Kategorier</h4>
      <ul className="mt-3">
        <li onClick={() => handleAlle()}>
          <div
            className={`${
              currentCat === "" && "text-primary"
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
                (currentCat === kat.title || openCat === kat.title) &&
                "text-primary"
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
                        currentCat === underKat && "text-primary"
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
