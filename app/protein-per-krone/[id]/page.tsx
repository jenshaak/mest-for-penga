import Carousel from "@/components/Carousel";
import {
  fetchDagligvare,
  fetchDagligvarer,
} from "@/lib/actions.ts/dagligvareActions";
import { VareType } from "@/typings";
import { imageMap, plachehodlerPic } from "@/utils/imageUrls";
import Image from "next/image";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};
export default async function ProductPage({ params }: Props) {
  const { id } = params;
  const vare: VareType = await fetchDagligvare(id);
  const { varer } = await fetchDagligvarer(
    "",
    "",
    "popularitet",
    vare.underKategori,
    10
  );
  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="mb-7">{vare.title}</h2>
      <div className="flex gap-5 max-h-[400px] w-full justify-center">
        <div className="flex justify-center h-[400px] w-1/3 bg-white rounded-xl">
          <Image
            src={`${vare.imageUrl || plachehodlerPic}`}
            alt={vare._id!}
            width={400}
            height={400}
            className="object-fit w-auto max-h-[100%] rounded-xl"
          />
        </div>
        <div className="bg-base-200 p-4 rounded-xl">
          <h4>Næringsinnhold 100g</h4>
          <table className="">
            <thead>
              <tr>
                <th>Type</th>
                <th>Mengde</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(vare.næringsinnhold)
                .filter(([key, value]) => value != null) // Filtrerer ut nøkler hvor verdien er null eller undefined
                .map(([key, value], index) => (
                  <tr key={index}>
                    <td>{key}</td>
                    <td>{value}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="bg-base-200 p-4 rounded-xl">
          <h4>Generell info</h4>
          <div>
            <p>Vekt: {vare.nettovekt?.toFixed().toString()}g</p>
            <p>Kategori: {vare.kategori}</p>
            <p>Under-kategori: {vare.underKategori}</p>
            <p>Proteiner/kr: {vare.proteinerPerKr?.toString()}</p>
            <p>Kalorier/kr: {vare.kalorierPerKr?.toString()}</p>
            <p>
              Protein per kalori: {vare.prosentProteinPerKalori?.toString()}%
            </p>
            <p>
              Allergener:{" "}
              {vare.allergener.map((a, i) => (
                <p key={i}>{a}</p>
              ))}
            </p>
          </div>
        </div>
        {vare.priser && vare.priser.length > 0 && (
          <div className="flex flex-col gap-2 bg-base-200 p-4 rounded-xl">
            <h4>Priser</h4>
            {vare.priser?.map((pris, i) => (
              <a
                href={pris.link}
                key={i}
                className="w-1/4 flex items-center gap-2"
                target="blank"
              >
                {pris.butikk && imageMap[pris.butikk] ? (
                  <Image
                    src={imageMap[pris.butikk]}
                    alt={pris.butikk || "butikk"}
                    width={200}
                    height={200}
                    className="max-w-[100%] h-auto rounded-lg"
                  />
                ) : (
                  <p className="mt-auto max-w-full text-lg">{pris.butikk}</p>
                )}
                <div>
                  <p
                    className={`text-md font-medium ${
                      i === 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {pris.pris}
                  </p>
                  <p className="text-xs">
                    {pris.prisPerKg
                      ? `${pris.prisPerKg}/kg`
                      : pris.prisPerStk
                      ? `${pris.prisPerStk}/stk`
                      : null}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="mt-10">
        <h3>Lignende Produkter</h3>
        {/* <Carousel kat={vare.underKategori || ""} /> */}
      </div>
    </div>
  );
}
