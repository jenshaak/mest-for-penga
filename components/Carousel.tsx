// "use client";

import { VareType } from "@/typings";
// import React, { useEffect, useState } from "react";
import VareCard from "./VareCard";
import useEmblaCarousel from "embla-carousel-react";
import { fetchDagligvarer } from "@/lib/actions.ts/dagligvareActions";

type Props = {
  kat?: string;
  varer: VareType[];
};

export default function Carousel({ kat, varer }: Props) {
  // const [emblaRef, emblaApi] = useEmblaCarousel();
  // const [varer, setVarer] = useState<VareType[] | null>(null);

  // useEffect(() => {
  //   if (emblaApi) {
  //     console.log(emblaApi.slideNodes()); // Access API
  //   }
  //   // async function getVarer() {
  //   //   const data = await fetchDagligvarer("", "", "popularitet", "", 10);
  //   // }
  //   // getVarer();
  // }, [emblaApi]);

  return (
    <div className="flex overflow-hidden gap-5">
      {varer?.map((vare, i) => (
        <VareCard key={i} vare={vare} />
      ))}
    </div>
  );
}
