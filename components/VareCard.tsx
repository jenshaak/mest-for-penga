import { Pris, VareType } from "@/typings";
import { imageMap } from "@/utils/imageUrls";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function VareCard({ vare }: { vare: VareType }) {
  // const searchParams = useSearchParams();
  // const { replace } = useRouter();
  // const pathname = usePathname();

  // const params = new URLSearchParams(searchParams);

  // const handleClick = (id: string) => {
  //   params.set("/", id);
  //   replace(`${pathname}?${params}`);
  // };
  return (
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
          className="object-fit w-auto max-h-full"
        />
      </div>
      <h4 className="line-clamp-2 font-semibold text-center pt-5 px-2">
        {vare.title}
      </h4>
      <p className="text-xs">Proteiner/kr {vare.proteinerPerKr}</p>
      <p className="text-xs">Kalorier/kr {vare.kalorierPerKr}</p>
      <p className="text-xs">Pro/kcal {vare.prosentProteinPerKalori}%</p>
      <div className="w-full flex justify-evenly p-1 border-t-1 rounded-b-md overflow-hidden gap-1 mt-auto">
        {vare.priser
          ?.slice(0, 4)
          .map((pris: Pris, i: React.Key | null | undefined) => (
            <a
              href={pris.link}
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
            </a>
          ))}
      </div>
    </Link>
  );
}
