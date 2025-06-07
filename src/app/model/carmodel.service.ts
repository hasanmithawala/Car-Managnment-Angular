import { SafeResourceUrl } from "@angular/platform-browser";

export interface Carmodel {
  modelName: string;
  modelCode: string;
  dateOfManufacturing: Date;
  sortOrder: number;
  image: string;
  ImageURL:SafeResourceUrl
 }