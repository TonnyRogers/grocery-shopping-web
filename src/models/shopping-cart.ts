import type { Product } from "./product";

export type ShoppingCart = {
  id: string;
  name: string;
  date: string;
  total: number;
  itemCount: number;
  products: Product[];
  completed: boolean;
}