import { Home, Plus, BarChart3, ShoppingCart } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import {
	Container,
	NavButton,
	NavGrid,
	NavLabel,
	SpecialButtonContainer,
} from "./styles";
import { Button } from "../ui/Button";

const BottomNavigation = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const navItems = [
		{ icon: Home, label: "Home", path: "/" },
		{ icon: ShoppingCart, label: "Carrinhos", path: "/carts" },
		{ icon: Plus, label: "Add", path: "/create-cart", special: true },
		{ icon: BarChart3, label: "Métricas", path: "/insights" },
	];

	const isActive = (path: string) => {
		if (path === "/") {
			return location.pathname === "/";
		}
		return location.pathname.startsWith(path);
	};

	return (
		<Container>
			<NavGrid>
				{navItems.map((item) => {
					const Icon = item.icon;
					const active = isActive(item.path);

					if (item.special) {
						return (
							<SpecialButtonContainer key={item.path}>
								<Button
									variant="primary"
									onClick={() => navigate(item.path)}
									style={{
										height: "3rem",
										width: "3rem",
										borderRadius: "50%",
										boxShadow: "0 4px 12px -4px rgba(0,0,0,0.25)",
									}}
								>
									<Icon className="h-6 w-6" />
								</Button>
							</SpecialButtonContainer>
						);
					}

					return (
						<NavButton
							key={item.path}
							onClick={() => navigate(item.path)}
							$active={active}
						>
							<Icon className="h-5 w-5" />
							<NavLabel>{item.label}</NavLabel>
						</NavButton>
					);
				})}
			</NavGrid>
		</Container>
	);
};

export default BottomNavigation;
