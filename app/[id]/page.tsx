import VareCard from "@/components/VareCard";
import {
  fetchDagligvare,
  fetchDagligvarer,
  fetchVareIds,
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

export const dynamicParams = true;

export async function generateStaticParams() {
  const ids = await fetchVareIds();
  console.log(ids.slice(1, 5));

  return ids.map((item) => ({
    id: item,
  }));
}

async function getVarer(id: string) {
  const vare: VareType = await fetchDagligvare(id);
  let { varer } = await fetchDagligvarer(
    "",
    "",
    "popularitet",
    vare.underKategori,
    8
  );
  return { vare, varer };
}

export default async function ProductPage({ params }: Props) {
  const { vare, varer } = await getVarer(params.id);

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="my-10 text-center">{vare.title}</h2>
      <div className="bg-base-300 rounded-xl flex flex-col gap-5 w-11/12 lg:justify-center lg:items-stretch items-center">
        <div className="flex lg:flex-row flex-col w-full lg:items-stretch items-center">
          <div className="flex items-center justify-center h-[400px] w-4/5 lg:w-7/12 bg-white rounded-xl">
            <Image
              src={`${vare.imageUrl || plachehodlerPic}`}
              alt={`${vare._id || "produkt-bilde"}`}
              width={300}
              height={300}
              className="object-fit w-auto max-h-full"
            />
          </div>
          <div className="p-4 w-4/5 lg:w-5/12 flex flex-col items-center">
            <h4 className="mb-4">Næringsinnhold 100g</h4>
            <table className="">
              <thead>
                <tr>
                  <th className="text-left">Type</th>
                  <th className="text-left">Mengde</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(vare.næringsinnhold)
                  .filter(([key, value]) => value != null)
                  .map(([key, value], index) => (
                    <tr key={index}>
                      <td>{key}</td>
                      <td>
                        {value}{" "}
                        {key === "kalorier"
                          ? "kcal"
                          : key === "energi"
                          ? "KJ"
                          : "g"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex lg:flex-row flex-col w-full lg:justify-evenly justify-center">
          <div className="p-4 w-full lg:w-fit flex flex-col items-center">
            <h4 className="mb-4">Generell info</h4>
            <table className="space-y-2">
              <tbody>
                <tr>
                  <td>Vekt: </td>
                  <td>{vare.nettovekt?.toFixed().toString()} g</td>
                </tr>
                <tr>
                  <td>Kategori: </td>
                  <td>{vare.kategori}</td>
                </tr>
                <tr>
                  <td>Under-kategori: </td>
                  <td>{vare.underKategori}</td>
                </tr>
                <tr>
                  <td>Proteiner/kr: </td>
                  <td>{vare.proteinerPerKr?.toString()}</td>
                </tr>
                <tr>
                  <td>Kalorier/kr: </td>
                  <td>{vare.kalorierPerKr?.toString()}</td>
                </tr>
                <tr>
                  <td>Protein/kcal: </td>
                  <td>{vare.prosentProteinPerKalori?.toString()}</td>
                </tr>
                <tr>
                  <td>Allergener: </td>
                  <td>
                    {vare.allergener.map((a, i) => (
                      <span key={i}>
                        {i > 0 && ", "}
                        {a.toLowerCase()}
                      </span>
                    ))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {vare.priser && vare.priser.length > 0 && (
            <div className="flex flex-col gap-2 p-4 w-full lg:w-fit items-center">
              <h4>Priser</h4>
              {vare.priser?.map((pris, i) => (
                <a
                  href={pris.link}
                  key={i}
                  className="flex items-center gap-2"
                  target="blank"
                >
                  {pris.butikk && imageMap[pris.butikk] ? (
                    <Image
                      src={imageMap[pris.butikk]}
                      alt={pris.butikk || "butikk"}
                      width={200}
                      height={200}
                      className="max-w-[25%] h-auto rounded-lg hover:ring focus:ring-2"
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
                      {pris.pris} kr
                    </p>
                    <p className="text-xs">
                      {pris.prisPerKg
                        ? `${pris.prisPerKg}kr/kg`
                        : pris.prisPerStk
                        ? `${pris.prisPerStk}kr/stk`
                        : null}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="mt-32 flex flex-col gap-8 items-center">
        <h2>Lignende Produkter</h2>
        <div className="flex flex-wrap items-center justify-center overflow-hidden gap-10">
          {varer?.map((vare, i) => (
            <VareCard key={i} vare={vare} />
          ))}
        </div>
      </div>
    </div>
  );
}
