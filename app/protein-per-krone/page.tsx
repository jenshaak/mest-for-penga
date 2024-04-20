import { KategoriType, Pris, VareType } from "@/typings";
import React from "react";
import Image from "next/image";
import { imageMap } from "@/utils/imageUrls";
import Pagination from "@/components/Pagination";
import { fetchKategorier } from "@/lib/actions.ts/kategoriActions";
import CategoriesBar from "@/components/CategoriesBar";
import { fetchDagligvarer } from "@/lib/actions.ts/dagligvareActions";
import Search from "@/components/Search";
import VareCard from "@/components/VareCard";
import FilterBar from "@/components/FilterBar";

type Props = {
  params: {};
  searchParams: {
    q?: string;
    page?: string;
    sort?: string;
    cat?: string;
  };
};

export default async function ProteinPerKronePage({ searchParams }: Props) {
  const q = searchParams?.q || "";
  const page = searchParams?.page || "";
  const sort = searchParams?.sort || "";
  let cat = searchParams?.cat || "";
  cat = cat.replace(/\+/g, " ").replace(/%20/g, " ");
  const { count, varer } = await fetchDagligvarer(q, page, sort, cat, 32);
  const kategorier = await fetchKategorier();

  return (
    <div>
      <FilterBar />
      <div className="flex">
        <CategoriesBar categories={kategorier} />
        <div>
          <Search placeholder="søk..." />
          <p>{count} resultater</p>
          <div className="flex flex-wrap gap-5 overflow-x-hidden justify-center">
            {varer &&
              varer.map((vare) => <VareCard key={vare._id} vare={vare} />)}
          </div>
          <Pagination count={count} />
        </div>
      </div>
    </div>
  );
}
