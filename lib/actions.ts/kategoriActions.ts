"use server"

import { connectToDb } from "../connection";
import { KategoriType } from "@/typings";
import Kategori from "../models/kategori";
import { TightsKategori } from "../models/tightsVare";

export async function fetchKategorier(type?: string) {
  await connectToDb();
  try {
    if(type === "tights"){
      let kategorier: KategoriType[] = await TightsKategori.find().lean();
      kategorier = kategorier.map(kategori => ({
        ...kategori,
        _id: kategori._id?.toString(), // Convert ObjectId to string
      }));
      return kategorier;
    } else {
      let kategorier: KategoriType[] = await Kategori.find().lean();
      kategorier = kategorier.map(kategori => ({
        ...kategori,
        _id: kategori._id?.toString(), // Convert ObjectId to string
      }));
      return kategorier;
    }
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function createKategori(title: string, type?: string){
  await connectToDb();
  try{
    let nyKategori
    if(type === "tights") {
      const duplicate = await TightsKategori.findOne({ title });
      if(duplicate){
        return "Kategorien har allerede blitt lagt til"
      }
      console.log("Tights")
      nyKategori = await TightsKategori.create({ title });
    } else {
      const duplicate = await Kategori.findOne({ title });
      if(duplicate){
        return "Kategorien har allerede blitt lagt til"
      }
      console.log("Else")
      nyKategori = await Kategori.create({ title });
    }
    return nyKategori;
  } catch (err) {
    console.log("ERROR", err)
    return err;
  }
};

export async function addUnderKategori(title: string, underKategori: string){
  await connectToDb();
  const kategori = await Kategori.findOne({ title });
  if(kategori.underKategorier.includes(underKategori)){
    return "Kategorien har allerede blitt lagt til"
  }
  try{
    const kategori = await Kategori.findOne({title});
    const underKategorier = [...kategori.underKategorier, underKategori];
    const nyKategori = await Kategori.findOneAndUpdate(
      { title: title }, 
      { $set: { underKategorier: underKategorier } },
      { new: true }
    );
    return nyKategori;
  } catch (err) {
    console.log("ERROR", err)
    return err;
  }
};
