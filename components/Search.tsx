"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams);

      params.set("page", "1"); // Pagination back to first page

      if (e.target.value) {
        e.target.value.length > 2 && params.set("q", e.target.value); // Om søket er mer enn 2 bokstaver
      } else {
        params.delete("q"); // Making sure pathname does not say /users=q?
      }
      replace(`${pathname}?${params}`);
    },
    300
  );

  return (
    <label className="input input-bordered flex items-center gap-2">
      <MagnifyingGlassIcon />
      <input
        onChange={(e) => handleSearch(e)}
        type="text"
        placeholder={placeholder}
        className="grow"
      />
    </label>
  );
}

export default Search;
