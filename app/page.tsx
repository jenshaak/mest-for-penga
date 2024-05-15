import React from "react";
import { fetchKategorier } from "@/lib/actions.ts/kategoriActions";
import CategoriesBar from "@/components/CategoriesBar";
import { fetchDagligvarer } from "@/lib/actions.ts/dagligvareActions";
import VareNavBar from "@/components/VareNavBar";
import Varer from "@/components/Varer";

type Props = {
  params: {};
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

export default async function Home({ searchParams }: Props) {
  const { q, page, sort, cat } = searchParams;
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
  const kategorier = await fetchKategorier();

  return (
    <div className="flex w-full">
      <h1>Hello world!</h1>
      <CategoriesBar kategorier={kategorier} currentCat={kat} />
      <div className="w-full">
        <div className="flex">
          <VareNavBar />
        </div>
        {/* <Varer searchParams={searchParams} /> */}
        {/* <p className="text-right mr-5">{count} resultater</p>
        <div className="flex flex-wrap gap-8 overflow-x-hidden justify-center p-7">
          {varer &&
            varer.map((vare) => <VareCard key={vare._id} vare={vare} />)}
          {count === 0 && <h3>Ingen resultater</h3>}
        </div>
        <Pagination count={count} /> */}
      </div>
    </div>
  );
}
