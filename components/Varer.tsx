import { fetchDagligvarer } from "@/lib/actions.ts/dagligvareActions";
import React from "react";
import Pagination from "./Pagination";
import VareCard from "./VareCard";
import { useRouter } from "next/router";

type Props = {
  searchParams: SearchParams;
};
type SearchParams = {
  q?: string;
  page?: string;
  sort?: string;
  cat?: string;
  proteinerPerKr?: string;
  kalorierPerKr?: string;
  prosentProteinPerKalori?: string;
};

type FilterKeys = keyof SearchParams;

export default async function Varer({ searchParams }: Props) {
  const {
    q,
    page,
    sort,
    cat,
    proteinerPerKr,
    kalorierPerKr,
    prosentProteinPerKalori,
  } = searchParams;
  const qu = q || "";
  const side = page || "";
  const sortBy = sort || "popularitet";
  const itemsPerPage = 32;
  let kat = cat || "";

  const filters: Record<string, string> = {};
  const filterKeys: FilterKeys[] = [
    "proteinerPerKr",
    "kalorierPerKr",
    "prosentProteinPerKalori",
  ];

  // Legger kun til de filtrene som brukes
  filterKeys.forEach((key) => {
    const value = searchParams[key];
    if (value) {
      filters[key] = value;
    }
  });

  kat = kat.replace(/\+/g, " ").replace(/%20/g, " ");
  const { count, varer } = await fetchDagligvarer(
    qu,
    side,
    sortBy,
    kat,
    itemsPerPage,
    filters
  );

  return (
    <div>
      <p className="text-right mr-5">{count} resultater</p>
      <div className="flex flex-wrap gap-8 overflow-x-hidden justify-center p-7">
        {varer && varer.map((vare) => <VareCard key={vare._id} vare={vare} />)}
        {count === 0 && <h3>Ingen resultater</h3>}
      </div>
      <Pagination count={count} />
    </div>
  );
}
