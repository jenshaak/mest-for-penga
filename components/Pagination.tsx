"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

type Props = {
  count: number;
  // itemsPerPage: number;
};

function Pagination({ count }: Props) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const itemsPerPage = 32;

  const page = searchParams.get("page") || "1";
  const numberOfPages = Math.ceil(count / itemsPerPage);

  const params = new URLSearchParams(searchParams);

  const hasPrev = itemsPerPage * (parseInt(page) - 1) > 0;
  const hasNext = itemsPerPage * (parseInt(page) - 1) + itemsPerPage < count;

  const handleChangePage = (type: string) => {
    type === "prev"
      ? params.set("page", String(parseInt(page) - 1))
      : params.set("page", String(parseInt(page) + 1));
    replace(`${pathname}?${params}`);
  };

  return (
    <div className="p-2.5 flex justify-evenly">
      <button
        className="btn btn-primary"
        disabled={!hasPrev}
        onClick={() => handleChangePage("prev")}
      >
        Previous
      </button>
      <div className="flex items-center gap-1 dark:text-white">
        <div className="bg-primary p-3 py-2 rounded-lg m-auto">{page}</div>
        of {numberOfPages}
      </div>
      <button
        className="btn btn-primary"
        disabled={!hasNext}
        onClick={() => handleChangePage("next")}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
