import { Pris, VareType } from "@/typings";
import { imageMap } from "@/utils/imageUrls";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function VareCard({ vare }: { vare: VareType }) {
  return (
    <>
      <Link
        key={vare._id}
        className="bg-base-300 rounded-xl w-80 h-96 flex flex-col items-center cursor-pointer mb-4"
        href={`/protein-per-krone/${vare._id}`}
      >
        <div className="h-1/2 flex items-center justify-center bg-white w-full rounded-t-xl">
          <Image
            src={vare.imageUrl!}
            alt={vare.title}
            width={300}
            height={300}
            priority
            className="object-fit w-auto max-h-full"
          />
        </div>
        <h4 className="line-clamp-2 font-semibold text-center pt-3 px-2">
          {vare.title}
        </h4>
        <div className="flex flex-col my-auto">
          <div className="flex gap-1 items-center">
            <ColorPicker pro={vare.proteinerPerKr} />
            <p className="text-xs">Proteiner/kr {vare.proteinerPerKr}</p>
          </div>
          <div className="flex gap-1 items-center">
            <ColorPicker kcal={vare.kalorierPerKr} />
            <p className="text-xs">Kalorier/kr {vare.kalorierPerKr}</p>
          </div>
          <div className="flex gap-1 items-center">
            <ColorPicker proKcal={vare.prosentProteinPerKalori} />
            <p className="text-xs">
              Protein/kcal {vare.prosentProteinPerKalori}%
            </p>
          </div>
        </div>
        <div className="w-full flex justify-evenly p-1 border-t-1 rounded-b-md overflow-hidden gap-1 mt-auto">
          {vare.priser
            ?.slice(0, 4)
            .map((pris: Pris, i: React.Key | null | undefined) => (
              <div
                key={i}
                className="w-1/4 h-[100%] flex flex-col items-center space-y-[2px]"
              >
                {pris.butikk && imageMap[pris.butikk] ? (
                  <Image
                    src={imageMap[pris.butikk]}
                    alt={pris.butikk || "butikk"}
                    width={300}
                    height={300}
                    className="h-12 w-12 rounded-md"
                  />
                ) : (
                  <p className="mt-auto max-w-full text-sm">{pris.butikk}</p>
                )}
                <p
                  className={`text-sm font-medium ${
                    i === 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {pris.pris},-
                </p>
              </div>
            ))}
        </div>
      </Link>
    </>
  );
}

type ColorProps = {
  pro?: number;
  kcal?: number;
  proKcal?: number;
};

export function ColorPicker({ pro, kcal, proKcal }: ColorProps) {
  let rating = 0;
  let bg = "white";
  if (pro) {
    rating = Math.round((pro / 3) * 17);
  } else if (kcal) {
    rating = Math.round((kcal / 80) * 17);
  } else if (proKcal) {
    rating = Math.round((proKcal / 8) * 17);
  }
  bg =
    rating < 1
      ? "red-500"
      : rating > 17
      ? "green-500"
      : rating < 4
      ? `red-500/${10 - rating}0`
      : rating < 8
      ? `orange-500/${13 - rating}0`
      : rating < 12
      ? `yellow-500/${17 - rating}0`
      : `green-500/${rating - 8}0`;
  return (
    <div
      className={`tooltip bg-${bg} w-[10px] h-[10px] border-[1px] border-black/10`}
      data-tip={rating}
      style={{
        borderRadius: "2px",
        backgroundColor: "f1f1f1",
      }}
    ></div>
  );
}
