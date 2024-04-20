"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

type Props = {
  count: number;
};

function Pagination({ count }: Props) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const page = searchParams.get("page") || "1";

  const params = new URLSearchParams(searchParams);
  const ITEMS_PER_PAGE = 2;

  const hasPrev = ITEMS_PER_PAGE * (parseInt(page) - 1) > 0;
  const hasNext =
    ITEMS_PER_PAGE * (parseInt(page) - 1) + ITEMS_PER_PAGE < count;

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
