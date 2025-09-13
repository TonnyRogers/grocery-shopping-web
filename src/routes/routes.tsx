import { Routes as DomRoutes, Route } from "react-router-dom";
import {
	AddProduct,
	CartDetails,
	CartsOverview,
	CreateCart,
	Dashboard,
	Insights,
	NotFound,
} from "../pages";

export function Routes() {
	return (
		<DomRoutes>
			<Route path="/" element={<Dashboard />} />
			<Route path="/carts" element={<CartsOverview />} />
			<Route path="/create-cart" element={<CreateCart />} />
			<Route path="/cart/:id" element={<CartDetails />} />
			<Route path="/add-product/:cartId" element={<AddProduct />} />
			<Route path="/insights" element={<Insights />} />
			<Route path="*" element={<NotFound />} />
		</DomRoutes>
	);
}
