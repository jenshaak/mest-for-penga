import mongoose, { Schema } from "mongoose";

const dagligvareSchema = new Schema(
  {
    title: String,
    kategori: {
      type: String,
      underKategorier: [String],
    },
    underKategori: String,
    næringsinnhold: {
      kalorier: Number,
      energi: Number,
      enumettetfett: Number,
      flerumettetfett: Number,
      fett: Number,
      karbohydrater: Number,
      kostfiber: Number,
      mettetfett: Number,
      sukkeralkoholer: Number,
      protein: Number,
      salt: Number,
      stivelse: Number,
      sukkerarter: Number,
    },
    nettovekt: Number,
    priser: [
      {
        butikk: String,
        pris: Number,
        prisPerKg: Number,
        prisPerStk: Number,
        link: String,
      }
    ],
    popularitet: Number,
    imageUrl: String,
    proteinerPerKr: Number,
    kalorierPerKr: Number,
    prosentProteinPerKalori: Number,
    allergener: [String],
  },
  {
    timestamps: true,
  }
);

const Dagligvare = mongoose.models.Dagligvare || mongoose.model("Dagligvare", dagligvareSchema);

export default Dagligvare;