import { ICategory } from "../../categories/interfaces/category.interface";

export interface IProduct {
  name: string;
  price: number;
  weight: number;
  description: string;
  thumbnail: string;
  images: string[];
  category: ICategory;
  stock: number;
}
