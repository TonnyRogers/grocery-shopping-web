import { useState } from "react";
import { ArrowLeft, Package, DollarSign, Hash } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import styled from "styled-components";
import useShoppingCartContext from "@/hooks/use-shopping-cart-context";

function generateId() {
	return `${Date.now().toString().slice(9, 13)}`;
}

export function AddProduct() {
	const navigate = useNavigate();
	const { cartId } = useParams();
	const [productName, setProductName] = useState("");
	const [quantity, setQuantity] = useState("1");
	const [price, setPrice] = useState("");
	const { items, addProduct, edit } = useShoppingCartContext();

	const handleAddProduct = () => {
		if (!cartId) return;
		if (!productName.trim() || !quantity || !price) {
			toast({
				title: "All fields required",
				description: "Please fill in all product details.",
				variant: "destructive",
			});
			return;
		}

		const numQuantity = parseInt(quantity);
		const numPrice = parseFloat(price);

		if (numQuantity <= 0 || numPrice <= 0) {
			toast({
				title: "Invalid values",
				description: "Quantity and price must be greater than zero.",
				variant: "destructive",
			});
			return;
		}

		const productId = generateId();

		addProduct(cartId, {
			id: productId,
			completed: false,
			name: productName,
			price: numPrice,
			quantity: numQuantity,
		});

		// Simulate adding product
		toast({
			title: "Product added!",
			description: `${productName} has been added to your cart.`,
		});

		// Reset form
		setProductName("");
		setQuantity("1");
		setPrice("");

		edit(cartId, {
			itemCount:
				Number(items.find((cartItem) => cartItem.id === cartId)?.itemCount) +
				numQuantity,
			total:
				Number(items.find((cartItem) => cartItem.id === cartId)?.total) +
				numQuantity * numPrice,
		});

		// Navigate back or stay for more items
		setTimeout(() => {
			navigate(-1);
		}, 1000);
	};

	const quickProducts = [
		{ name: "Bananas", price: "3.50" },
		{ name: "Leite Integral", price: "4.20" },
		{ name: "Pão de Forma", price: "5.80" },
		{ name: "Ovos", price: "6.50" },
		{ name: "Abacate", price: "2.80" },
		{ name: "Yogurt", price: "7.20" },
	];

	const fillQuickProduct = (product: (typeof quickProducts)[0]) => {
		setProductName(product.name);
		setPrice(product.price);
	};

	return (
		<Container>
			<Header>
				<HeaderContent>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => navigate(-1)}
						style={{ height: "32px", width: "32px", padding: 0 }}
					>
						<ArrowLeft style={{ height: "16px", width: "16px" }} />
					</Button>
					<Title>Adc Produtos 🛍️</Title>
				</HeaderContent>
			</Header>

			<Content>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						overflow: "scroll",
						height: "70vh",
            padding: '4px',
					}}
				>
					<ProductIconContainer>
						<ProductIcon>
							<Package
								style={{ height: "40px", width: "40px", color: "white" }}
							/>
						</ProductIcon>
					</ProductIconContainer>

					<Card style={{ padding: "24px" }}>
						<FormContainer>
							<FormField>
								<Label htmlFor="productName">Nome</Label>
								<InputContainer>
									<Package
										style={{
											position: "absolute",
											left: "12px",
											top: "50%",
											transform: "translateY(-50%)",
											height: "16px",
											width: "16px",
											color: "hsl(var(--muted-foreground))",
										}}
									/>
									<Input
										id="productName"
										value={productName}
										onChange={(e) => setProductName(e.target.value)}
										placeholder="Enter product name..."
										style={{ paddingLeft: "40px" }}
										autoFocus
									/>
								</InputContainer>
							</FormField>

							<FormRow>
								<FormField>
									<Label htmlFor="quantity">Quantidade</Label>
									<InputContainer>
										<Hash
											style={{
												position: "absolute",
												left: "12px",
												top: "50%",
												transform: "translateY(-50%)",
												height: "16px",
												width: "16px",
												color: "hsl(var(--muted-foreground))",
											}}
										/>
										<Input
											id="quantity"
											type="number"
											min="1"
											value={quantity}
											onChange={(e) => setQuantity(e.target.value)}
											placeholder="1"
											style={{ paddingLeft: "40px" }}
										/>
									</InputContainer>
								</FormField>

								<FormField>
									<Label htmlFor="price">Preço ($)</Label>
									<InputContainer>
										<DollarSign
											style={{
												position: "absolute",
												left: "12px",
												top: "50%",
												transform: "translateY(-50%)",
												height: "16px",
												width: "16px",
												color: "hsl(var(--muted-foreground))",
											}}
										/>
										<Input
											id="price"
											type="number"
											step="0.01"
											min="0"
											value={price}
											onChange={(e) => setPrice(e.target.value)}
											placeholder="0.00"
											style={{ paddingLeft: "40px" }}
										/>
									</InputContainer>
								</FormField>
							</FormRow>

							{quantity && price && (
								<TotalPreview>
									<TotalPreviewContent>
										<TotalLabel>Custo total:</TotalLabel>
										<TotalValue>
											$
											{(
												parseInt(quantity || "0") * parseFloat(price || "0")
											).toFixed(2)}
										</TotalValue>
									</TotalPreviewContent>
								</TotalPreview>
							)}
						</FormContainer>
					</Card>

					<QuickAddSection>
						<SectionTitle>Lista Rápida</SectionTitle>
						<QuickProductsList>
							{quickProducts.map((product) => (
								<QuickProductButton
									key={product.name}
									variant="outline"
									onClick={() => fillQuickProduct(product)}
								>
									<span>{product.name}</span>
									<QuickProductPrice>${product.price}</QuickProductPrice>
								</QuickProductButton>
							))}
						</QuickProductsList>
					</QuickAddSection>
				</div>

				<Card style={{ padding: "16px" }}>
					<Button
						onClick={handleAddProduct}
						variant="primary"
						style={{
							width: "100%",
							height: "48px",
							fontSize: "1.125rem",
						}}
						disabled={!productName.trim() || !quantity || !price}
					>
						Adc ao Carrinho
					</Button>
				</Card>
			</Content>
		</Container>
	);
}

const Container = styled.div`
	min-height: 100vh;
	background: ${({ theme }) => theme.colors.background};
`;

const Header = styled.div`
	position: sticky;
	top: 0;
	background: ${({ theme }) => theme.colors.background};
	border-bottom: 1px solid ${({ theme }) => theme.colors.border};
	z-index: 10;
`;

const HeaderContent = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
	padding: 16px;
`;

const Title = styled.h1`
	font-size: 1.25rem;
	font-weight: 600;
	color: ${({ theme }) => theme.colors.foreground};
`;

const Content = styled.div`
	padding: 16px;
	display: flex;
	flex-direction: column;
	gap: 24px;
`;

const ProductIconContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 24px;
`;

const ProductIcon = styled.div`
	height: 80px;
	width: 80px;
	background: ${({ theme }) => theme.gradients.primary};
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: ${({ theme }) => theme.shadows.glow};
`;

const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
  
`;

const FormField = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;

`;

const InputContainer = styled.div`
	position: relative;
`;

const FormRow = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 16px;
`;

const TotalPreview = styled.div`
	background: ${({ theme }) => theme.colors.muted}80;
	border-radius: ${({ theme }) => theme.radius};
	padding: 16px;
`;

const TotalPreviewContent = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const TotalLabel = styled.span`
	font-size: 0.875rem;
	color: ${({ theme }) => theme.colors.mutedForeground};
`;

const TotalValue = styled.span`
	font-size: 1.125rem;
	font-weight: 600;
	color: ${({ theme }) => theme.colors.foreground};
`;

const QuickAddSection = styled.div`
  margin-top: 8px;
`;

const SectionTitle = styled.h3`
	font-size: 1.125rem;
	font-weight: 500;
	margin-bottom: 12px;
	color: ${({ theme }) => theme.colors.foreground};
`;

const QuickProductsList = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 8px;
`;

const QuickProductButton = styled(Button)`
	height: 48px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: ${({ theme }) => theme.colors.card};

	&:hover {
		background: ${({ theme }) => theme.colors.accent};
	}
`;

const QuickProductPrice = styled.span`
	color: ${({ theme }) => theme.colors.mutedForeground};
`;
