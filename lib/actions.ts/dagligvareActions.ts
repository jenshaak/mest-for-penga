"use server"

import { connectToDb } from "../connection";
import Dagligvare from "../models/dagligvare"
import { VareType } from "@/typings";

export const fetchVareIds = async () => {
  try {
    await connectToDb();
    const ids = await Dagligvare.find({}, '_id').lean();
    return ids.map(doc => (doc as any)._id.toString()); 
  } catch(err) {
    console.error("Failed to fetch IDs:", err);
    return []; 
  }
}

export const fetchDagligvare = async (id: string) => {
  try {
    await connectToDb();
    const dagligvare = await Dagligvare.findById({ _id: id}); //.lean();
    return dagligvare;
  } catch (err) {
    console.log("Catch ", err)
    throw new Error("Failed to fetch dagligvare!");
  }
}

type Filters = Record<string, string>;

export const fetchDagligvarer = async (q: string, page: string, sort: string, cat?: string, itemsPerPage: number = 10, filters?: Filters) => {
  console.log("Fetching dagligvarer")
  const regex = new RegExp(q, "i"); // Making the search query case insensitive (upper-/lowercase)
  const pageNum = page === "" ? 1 : Number(page);
  const sortBy = sort === "" ? "createdAt" : sort;
  let query: any = { title: { $regex: regex } };

  if(cat !== "") {
    query = { 
      title: { $regex: regex },
      $or: [
        { kategori: cat },
        { underKategori: cat }
      ]
    };
  }

  console.log(filters);

  if (filters) {
    Object.keys(filters).forEach(key => {
      const range = filters[key];
      if (range) {
        const [min, max] = range.split("-");
        console.log("min",min,"max", max)
        if (!query[key]) query[key] = {};
        if (min) query[key].$gte = min;
        if (max) query[key].$lte = max;
      }
    });
  }

  try {
    await connectToDb();
    console.log("CONNECTED");
    const [ count, varer ] = await Promise.all([
      Dagligvare.countDocuments(query),
      Dagligvare.find(query)
        .limit(itemsPerPage)
        .skip(itemsPerPage * (pageNum - 1))
        // .lean()
        .sort({[sortBy]: sortBy === 'popularitet' ? 1 : -1})
    ]);
    return { count, varer };
  } catch (err) {
    console.log("Error when fetching", err);
    throw new Error("Failed to fetch dagligvarer!");
  }
};

export async function createDagligvare(body: VareType){
  const { title, næringsinnhold, priser, imageUrl } = body;
  await connectToDb();

  const duplicate = await Dagligvare.findOne({ title });
  if(duplicate){
    return "Dagligvaren har allerede blitt lagt til"
  }

  try{
    const nyVare = await Dagligvare.create(body);
    return nyVare;
  } catch (err) {
    console.log("ERROR", err)
    return err;
  }
}

export async function createDagligvarer(body: VareType[]){
  await connectToDb();
  const checkDuplicatesPromises = body.map(async (item) => {
    const duplicate = await Dagligvare.findOne({ title: item.title });
    return duplicate ? null : item;
  });
  const results = await Promise.all(checkDuplicatesPromises);
  const uniqueItems = results.filter(item => item !== null);
  if(uniqueItems.length === 0){
    return "Ingen nye varer å legge til"
  }
  try{
    const nyeVarer = Dagligvare.create(uniqueItems);
    return nyeVarer;
  } catch (err) {
    return err;
  }
}

