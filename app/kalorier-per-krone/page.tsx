"use client";

import React from "react";
import { scrapeTights } from "../../utils/scraping/scrapeTights";

export default function KalorierPerKronePage() {
  const handleSubmit = async () => {
    try {
      await scrapeTights("https://www.tights.no/kategori/smartmat/");
    } catch {
      return "Error";
    }
  };

  return (
    <div>
      <button onClick={handleSubmit} className="btn btn-primary">
        Scrape Tights
      </button>
    </div>
  );
}
