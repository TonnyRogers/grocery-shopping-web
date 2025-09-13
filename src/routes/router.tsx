import { useLocation } from "react-router-dom";
import { Routes } from "./routes";
import BottomNavigation from "../components/BottomNavigation";

export function Router() {
	const location = useLocation();
	const showBottomNav = !["/create-cart", "/add-product"].includes(
		location.pathname
	);

	return (
		<>
			<Routes />
			{showBottomNav && <BottomNavigation />}
		</>
	);
}
