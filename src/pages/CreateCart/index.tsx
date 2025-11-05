import { useState } from "react";
import { ArrowLeft, Calendar, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import {
	Container,
	Header,
	CartIconWrapper,
	Content,
	DateInputWrapper,
	FormContainer,
	FormField,
	HeaderContent,
	IconContainer,
	QuickSelectGrid,
	QuickSelectSection,
	SectionTitle,
	Title,
} from "./styles";
import useShoppingCartContext from "@/hooks/use-shopping-cart-context";

function generateId() {
	return `${Date.now().toString().slice(9, 13)}`;
}

export function CreateCart() {
	const navigate = useNavigate();
	const [cartName, setCartName] = useState("");
	const [selectedDate, setSelectedDate] = useState(
		new Date().toISOString().split("T")[0]
	);
	const { create } = useShoppingCartContext();

	const handleCreateCart = () => {
		if (!cartName.trim()) {
			toast({
				title: "Cart name required",
				description: "Please enter a name for your shopping cart.",
				variant: "destructive",
			});
			return;
		}

		const cartId = generateId();

		create({
			name: cartName,
			date: selectedDate.toString(),
			completed: false,
			id: cartId,
			itemCount: 0,
			products: [],
			total: 0,
		});

		// Simulate cart creation
		toast({
			title: "Cart created successfully!",
			description: `"${cartName}" is ready for shopping.`,
		});

		// Navigate to the new cart (simulated with ID)
		setTimeout(() => {
			navigate(`/cart/${cartId}`);
		}, 1000);
	};

	const quickCartNames = [
		"Compras da semana",
		"Compra rápida",
		"Almoço de domingo",
		"Comida saudavel",
		"Churrasco do final de semana",
	];

	return (
		<Container>
			{/* Header */}
			<Header>
				<HeaderContent>
					<Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
						<ArrowLeft className="h-4 w-4" />
					</Button>
					<Title>Novo carrinho 🛒</Title>
				</HeaderContent>
			</Header>

			<Content>
				{/* Cart Icon */}
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						overflow: "scroll",
						height: "65vh",
						padding: "4px",
					}}
				>
					<IconContainer>
						<CartIconWrapper>
							<ShoppingCart className="h-10 w-10" />
						</CartIconWrapper>
					</IconContainer>

					{/* Cart Name Input */}
					<Card style={{ padding: "1.5rem" }}>
						<FormContainer>
							<FormField>
								<Label htmlFor="cartName">Nome do carrinho</Label>
								<Input
									id="cartName"
									value={cartName}
									onChange={(e) => setCartName(e.target.value)}
									placeholder="Enter cart name..."
								/>
							</FormField>

							<FormField>
								<Label htmlFor="cartDate">Data da compra</Label>
								<DateInputWrapper>
									<Calendar className="calendar-icon" />
									<Input
										id="cartDate"
										type="date"
										value={selectedDate}
										onChange={(e) => setSelectedDate(e.target.value)}
										style={{ paddingLeft: "2.5rem" }}
									/>
								</DateInputWrapper>
							</FormField>
						</FormContainer>
					</Card>

					{/* Quick Cart Names */}
					<QuickSelectSection>
						<SectionTitle>Lista Básica</SectionTitle>
						<QuickSelectGrid>
							{quickCartNames.map((name) => (
								<Button
									key={name}
									variant="outline"
									onClick={() => setCartName(name)}
									style={{ height: "3rem", justifyContent: "flex-start" }}
								>
									{name}
								</Button>
							))}
						</QuickSelectGrid>
					</QuickSelectSection>
				</div>
				{/* Create Button */}
				<Card style={{ padding: "1rem" }}>
					<Button
						variant="primary"
						onClick={handleCreateCart}
						disabled={!cartName.trim()}
						style={{
							width: "100%",
							height: "3rem",
							fontSize: "1.125rem",
						}}
					>
						Criar carrinho de compras
					</Button>
				</Card>
			</Content>
		</Container>
	);
}
