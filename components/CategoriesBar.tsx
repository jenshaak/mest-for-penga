"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { KategoriType } from "@/typings";

export default function CategoriesBar({
  categories,
}: {
  categories: KategoriType[];
}) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams);

  const handleClick = (cat: string) => {
    params.set("cat", cat);
    replace(`${pathname}?${params}`);
  };
  return (
    <ul className="menu bg-base-100 w-56 rounded-box">
      <li>
        {categories?.map((cat) => (
          <details key={cat.title}>
            <summary>
              <a onClick={() => handleClick(cat.title!)}>{cat.title}</a>
            </summary>

            <ul>
              {cat.underKategorier?.map((underKat) => (
                <li key={underKat}>
                  <a onClick={() => handleClick(underKat)}>{underKat}</a>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </li>
    </ul>
  );
}
