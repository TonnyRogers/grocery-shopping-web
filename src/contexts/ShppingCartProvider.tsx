import type { ReactNode } from "react";
import { ShoppingCartContext } from "./ShoppingCartContext";
import { useShoppingCart } from "@/hooks/use-shopping-cart";

const ShoppingCartProvider = ({ children }: { children: ReactNode }) => {
  const {
    shoppingCarts,
    inactiveShoppingCarts,
    create,
    edit,
    remove,
    addProduct,
    editProduct,
    removeProduct,
    loading,
  } = useShoppingCart();

  return (
    <ShoppingCartContext.Provider
      value={{
        items: shoppingCarts,
        pastItems: inactiveShoppingCarts,
        create,
        edit,
        delete: remove,
        addProduct,
        editProduct,
        removeProduct,
        loading
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;