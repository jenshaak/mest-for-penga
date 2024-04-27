"use client";

import React from "react";
import { scrapeTights } from "../../utils/scraping/scrapeTights";
import { ColorPicker } from "@/components/VareCard";

export default function KalorierPerKronePage() {
  const handleSubmit = async () => {
    try {
      await scrapeTights("https://www.tights.no/kategori/smartmat/");
    } catch {
      return "Error";
    }
  };

  const colorPickers = Array.from({ length: 30 }, (_, i) => (
    <ColorPicker kcal={i} />
  ));
  return (
    <div>
      {/* <button onClick={handleSubmit} className="btn btn-primary">
        Scrape Tights
      </button>
      {colorPickers} */}
    </div>
  );
}
