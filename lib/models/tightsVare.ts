import mongoose, { Schema } from "mongoose";

const tightsVareSchema = new Schema(
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
    pris: Number,
    prisPerKg: Number,
    prisPerStk: Number,
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

const tightsKategoriSchema = new Schema(
  {
    title: String,
  }
);

const TightsKategori = mongoose.models.TightsKategori || mongoose.model("TightsKategori", tightsKategoriSchema);
const TightsVare = mongoose.models.TightsVare || mongoose.model("TightsVare", tightsVareSchema);

export { TightsVare, TightsKategori };