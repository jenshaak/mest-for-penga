import { fetchDagligvare } from "@/lib/actions.ts/dagligvareActions";
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
  return (
    <div className="flex">
      <Image
        src={`${vare.imageUrl || plachehodlerPic}`}
        alt={vare._id!}
        width={500}
        height={500}
      />
      <div className="overflow-x-auto">
        <table className="">
          <thead>
            <tr>
              <th>Type</th>
              <th>Mengde</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(vare.næringsinnhold).map(([key, value], index) => (
              <tr key={index}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
