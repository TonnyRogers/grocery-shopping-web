
import { ShoppingCartContext } from "@/contexts/ShoppingCartContext";
import { useContext } from "react";

const useShoppingCartContext = () => useContext(ShoppingCartContext);

export default useShoppingCartContext;