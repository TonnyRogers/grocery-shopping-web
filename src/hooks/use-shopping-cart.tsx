import type { ShoppingCart } from "@/models/shopping-cart";
import { useLocalStorage } from "./use-local-storage";
import { LocalStorageKeys } from "@/constants/local-storage-keys";
import { useState } from "react";
import type { Product } from "@/models/product";

export const useShoppingCart = () => {
	const { getItem, setItem } = useLocalStorage();
	const [loading, setLoading] = useState(false);
	const [shoppingCarts, setShoppingCarts] = useState<ShoppingCart[]>(() => {
		const currentCarts = getItem(LocalStorageKeys.CARTS_ACTIVE);
		if (currentCarts) {
			return JSON.parse(currentCarts);
		}

		return [];
	});
	const [inactiveShoppingCarts, setInactiveShoppingCarts] = useState<
		ShoppingCart[]
	>(() => {
		const currentCarts = getItem(LocalStorageKeys.CARTS_PAST);
		if (currentCarts) {
			return JSON.parse(currentCarts);
		}

		return [];
	});

	function create(data: ShoppingCart) {
		const cartList = shoppingCarts;
		cartList?.push(data);

		setItem(LocalStorageKeys.CARTS_ACTIVE, JSON.stringify(cartList));
		setShoppingCarts(cartList);
	}

	function edit(id: string, data: Partial<Omit<ShoppingCart, "id">>) {
		setLoading(true);
		const cartList = shoppingCarts;
		const cartIndex = cartList?.findIndex((cart) => cart.id === id);

		if (cartIndex !== null && cartIndex !== -1) {
			cartList[cartIndex].completed =
				data.completed ?? cartList[cartIndex].completed;
			cartList[cartIndex].date = data.date ?? cartList[cartIndex].date;
			cartList[cartIndex].itemCount =
				data.itemCount ?? cartList[cartIndex].itemCount;
			cartList[cartIndex].name = data.name ?? cartList[cartIndex].name;
			cartList[cartIndex].total = data.total ?? cartList[cartIndex].total;
			setItem(LocalStorageKeys.CARTS_ACTIVE, JSON.stringify(cartList));
			setShoppingCarts(cartList);
		}
		setLoading(false);
	}

	function remove(id: string) {
		const cartList = shoppingCarts;
		const inactiveCartList = inactiveShoppingCarts;
		const cartIndex = cartList?.findIndex((cart) => cart.id === id);

		if (cartIndex !== null && cartIndex !== -1) {
			inactiveCartList.push(cartList[cartIndex]);
			setInactiveShoppingCarts(inactiveCartList);

			cartList?.splice(cartIndex);
			setItem(LocalStorageKeys.CARTS_ACTIVE, JSON.stringify(cartList));
			setItem(LocalStorageKeys.CARTS_PAST, JSON.stringify(inactiveCartList));
			setShoppingCarts(cartList);
		}
	}

	function addProduct(cartId: string, data: Product) {
		setLoading(true);
		const cartList = shoppingCarts;
		const cartIndex = cartList?.findIndex((cart) => cart.id === cartId);

		if (cartIndex !== null && cartIndex !== -1) {
			cartList[cartIndex].products.push(data);
			setItem(LocalStorageKeys.CARTS_ACTIVE, JSON.stringify(cartList));
			setShoppingCarts(cartList);
		}
		setLoading(false);
	}

	function editProduct(
		cartId: string,
		id: string,
		data: Partial<Omit<Product, "id">>
	) {
		const cartList = shoppingCarts;
		const cartIndex = cartList?.findIndex((cart) => cart.id === cartId);

		if (cartIndex !== null && cartIndex !== -1) {
			const cartProductIndex = cartList[cartIndex].products?.findIndex(
				(product) => product.id === id
			);
			if (cartProductIndex !== null && cartProductIndex !== -1) {
				cartList[cartIndex].products[cartProductIndex].completed =
					data.completed ??
					cartList[cartIndex].products[cartProductIndex].completed;
				cartList[cartIndex].products[cartProductIndex].name =
					data.name ?? cartList[cartIndex].products[cartProductIndex].name;
				cartList[cartIndex].products[cartProductIndex].price =
					data.price ?? cartList[cartIndex].products[cartProductIndex].price;
				cartList[cartIndex].products[cartProductIndex].quantity =
					data.quantity ??
					cartList[cartIndex].products[cartProductIndex].quantity;

				setItem(LocalStorageKeys.CARTS_ACTIVE, JSON.stringify(cartList));
				setShoppingCarts(cartList);
			}
		}
	}

	function removeProduct(cartId: string, id: string) {
		const cartList = shoppingCarts;
		const cartIndex = cartList?.findIndex((cart) => cart.id === cartId);

		console.log('removeProduct', {cartIndex});

		if (cartIndex !== null && cartIndex !== -1) {
			const cartProductIndex = cartList[cartIndex].products?.findIndex(
				(product) => product.id === id
			);
			console.log('removeProduct', {cartProductIndex});
			if (cartProductIndex !== null && cartProductIndex !== -1) {
				console.log('removeProduct', {cartList});
				cartList[cartIndex].products?.splice(cartProductIndex, 1);

				
				setItem(LocalStorageKeys.CARTS_ACTIVE, JSON.stringify(cartList));
				setShoppingCarts(cartList);
			}
		}
	}

	return {
		shoppingCarts,
		inactiveShoppingCarts,
		create,
		edit,
		remove,
		addProduct,
		editProduct,
		removeProduct,
		loading,
	};
};
