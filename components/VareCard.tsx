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
      className="bg-base-100 rounded-xl w-60 h-96 p-3 flex flex-col items-center cursor-pointer"
      href={`/protein-per-krone/${vare._id}`}
    >
      <div className="h-1/2 flex items-center justify-center">
        <Image
          src={vare.imageUrl!}
          alt={vare.title}
          width={300}
          height={300}
          className="object-fit w-auto max-h-[100%]"
        />
      </div>
      <h4 className="line-clamp-3 font-semibold text-center pt-5">
        {vare.title}
      </h4>
      <p>Proteiner Per Kr {vare.proteinerPerKr}</p>
      <p>Kalorier Per Kr {vare.kalorierPerKr}</p>
      <div className="bg-base-200 h-maxw-full flex justify-evenly p-1 border-t-1 rounded-b-md overflow-hidden gap-1 mt-auto">
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
                  width={200}
                  height={200}
                  className="max-w-[100%] h-auto"
                />
              ) : (
                <p className="mt-auto max-w-full text-sm">{pris.butikk}</p>
              )}
              <p
                className={`text-sm font-medium ${
                  i === 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {pris.pris}
              </p>
            </a>
          ))}
      </div>
    </Link>
  );
}
