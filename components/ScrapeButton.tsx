"use client";

import { scrapeData } from "@/utils/scraping/scrapeKassalapp";
import React from "react";

export default function ScrapeButton() {
  const handleClick = async () => {};
  return (
    <button
      onClick={(async) =>
        scrapeData(
          "https://kassal.app/varer?naring[protein][min]=35&sortering=pris_asc"
        )
      }
      className="btn btn-primary"
    >
      Scrape
    </button>
  );
}
