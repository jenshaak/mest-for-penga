"use client";

import React from "react";
import { scrapeData } from "../../utils/scraping/scrapeKassalapp";

export default function ProduktenhetPerKronePage() {
  const handleSubmit = async () => {
    try {
      await scrapeData(
        "https://kassal.app/varer?kategori=ingen&naring[protein][min]=1&sortering=pris_desc"
      );
    } catch {
      return "Error";
    }
  };

  return (
    <div>
      <button onClick={handleSubmit} className="btn btn-primary">
        Scrape kassalapp
      </button>
    </div>
  );
}
