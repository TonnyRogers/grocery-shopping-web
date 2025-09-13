import type { Product } from "@/models/product";
import type { ShoppingCart } from "@/models/shopping-cart";
import { createContext } from "react";

interface IShoppingCartContext {
	items: ShoppingCart[];
  pastItems: ShoppingCart[];
	loading: boolean;
	create: (data: ShoppingCart) => void;
  edit: (id: string, data: Partial<Omit<ShoppingCart, "id">>) => void;
  delete: (id: string) => void;
  addProduct: (cartId: string, data: Product) => void;
  editProduct: (cartId: string, id: string, data: Partial<Omit<Product, 'id'>>) => void;
  removeProduct: (cartId: string, id: string) => void;
}

export const ShoppingCartContext = createContext<IShoppingCartContext>({
	items: [],
	pastItems: [],
	loading: false,
	create: () => {},
	edit: () => {},
	delete: () => {},
	addProduct: () => {},
	editProduct: () => {},
	removeProduct: () => {},
});