export type VareType = {
  _id?: string,
  title: string,
  kategori?: string,
  underKategori?: string,
  næringsinnhold: Næringsinnhold,
  nettovekt?: Number,
  priser?: Pris[],
  imageUrl?: string | undefined,
  popularitet: number,
  proteinerPerKr?: number,
  kalorierPerKr?: number,
  prosentProteinPerKalori?: number,
  allergener: string[],
}

export type Næringsinnhold = {
  [key: string] : number,
};

export type Pris = {
  butikk: string | undefined,
  pris: number,
  prisPerKg?: number,
  prisPerStk?: number,
  link: string | undefined,
}

export type KategoriType = {
  _id?: string,
  title: string | undefined,
  underKategorier?: string[],
}

export type TightsVareType = {
  _id?: string,
  title: string,
  kategori?: string,
  næringsinnhold: Næringsinnhold,
  nettovekt?: number,
  pris: number,
  prisPerKg?: number,
  prisPerStk?: number,
  imageUrl?: string | undefined,
  popularitet: number,
  proteinerPerKr?: number,
  kalorierPerKr?: number,
  prosentProteinPerKalori?: number,
  allergener: string[],
}