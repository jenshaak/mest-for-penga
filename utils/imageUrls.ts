
export const oda = "https://cdn.kassal.app/69a84df6-7ca8-4427-8f9f-1723b060e78c/logos/Oda.svg";
export const meny = "https://cdn.kassal.app/69a84df6-7ca8-4427-8f9f-1723b060e78c/logos/Meny.svg";
export const joker = "https://cdn.kassal.app/69a84df6-7ca8-4427-8f9f-1723b060e78c/logos/Joker.svg";
export const spar = "https://cdn.kassal.app/69a84df6-7ca8-4427-8f9f-1723b060e78c/logos/Spar.svg";
export const bunnpris = "https://cdn.kassal.app/69a84df6-7ca8-4427-8f9f-1723b060e78c/logos/Bunnpris.svg";
export const engrosnett = "https://cdn.kassal.app/69a84df6-7ca8-4427-8f9f-1723b060e78c/logos/Engrosnett.svg";
export const europris = "https://cdn.kassal.app/69a84df6-7ca8-4427-8f9f-1723b060e78c/logos/Europris.svg";
export const plachehodlerPic = "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png";

export type ImageMap = {
  [key: string]: string; // This is the index signature
};
export const imageMap: ImageMap = {
  oda,
  spar,
  bunnpris,
  joker,
  meny,
  engrosnett,
  placeholderPic: plachehodlerPic, // Assuming there's a typo in the import and it should be placeholderPic
};