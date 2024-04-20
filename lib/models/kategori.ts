import mongoose, { Schema } from "mongoose";

const kategoriSchema = new Schema(
  {
    title: String,
    underKategorier: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Kategori = mongoose.models.Kategori || mongoose.model("Kategori", kategoriSchema);

export default Kategori;