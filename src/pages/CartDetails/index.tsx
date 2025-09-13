import { useEffect, useState } from "react";
import {
	ArrowLeft,
	Plus,
	Edit3,
	Trash2,
	Check,
	ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import styled from "styled-components";
import useShoppingCartContext from "@/hooks/use-shopping-cart-context";
import type { ShoppingCart as ShoppingCartType } from "@/models/shopping-cart";
import type { Product } from "@/models/product";

export function CartDetails() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [currentCart, setCurrentCart] = useState<ShoppingCartType>();
	const { items, removeProduct, editProduct, edit } = useShoppingCartContext();
	const [products, setProducts] = useState<Product[]>([]);

	const totalAmount = currentCart?.products.reduce(
		(sum, product) => sum + product.price * product.quantity,
		0
	);
	const completedItems =
		currentCart?.products.filter((p) => p.completed).length ?? 0;

	const toggleProductComplete = (productId: string) => {
		const product = products.find((prod) => prod.id === productId);
		if (!id) return;

		editProduct(id, productId, { completed: !product?.completed });
	};

	const deleteProduct = (productId: string) => {
		if (!id) return;
		removeProduct(id, productId);
		toast({
			title: "Item removed",
			description: "Product has been removed from your cart.",
		});
	};

	const completeCart = () => {
		if (!id) return;

		edit(id, {
			completed: true,
		});
		toast({
			title: "Cart completed!",
			description: `Shopping trip for "${currentCart?.name}" has been completed.`,
		});
		navigate("/");
	};

	useEffect(() => {
		const cart = items.find((cart) => cart.id === id);
		if (cart) {
			setCurrentCart(cart);
			setProducts(cart.products);
		}
	}, [id, items]);

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
					<HeaderInfo>
						<Title>{currentCart?.name}</Title>
						<Subtitle>
							{completedItems} de {products.length} itens pegos
						</Subtitle>
					</HeaderInfo>
				</HeaderContent>
			</Header>

			<Content>
				<Card style={{ padding: "24px" }}>
					<SummaryRow>
						<SummaryLeft>
							<IconContainer>
								<ShoppingCart
									style={{
										height: "24px",
										width: "24px",
										color: "hsl(var(--primary))",
									}}
								/>
							</IconContainer>
							<SummaryInfo>
								<SummaryTitle>Total</SummaryTitle>
								<SummaryText>{products.length} itens</SummaryText>
							</SummaryInfo>
						</SummaryLeft>
						<SummaryRight>
							<TotalAmount>${totalAmount?.toFixed(2)}</TotalAmount>
							<ProgressRow>
								<ProgressBar>
									<ProgressFill
										style={{
											width: `${(completedItems / products.length) * 100}%`,
										}}
									/>
								</ProgressBar>
								<ProgressText>
									{Math.round((completedItems / products.length) * 100)}%
								</ProgressText>
							</ProgressRow>
						</SummaryRight>
					</SummaryRow>
				</Card>

				<div
					style={{
						display: "flex",
						flexDirection: "column",
						overflow: "scroll",
						height: "40vh",
						padding: "4px",
					}}
				>
					<ProductsSection>
						<SectionHeader>
							<SectionTitle>Lista de Compra</SectionTitle>
							<Button
								onClick={() => navigate(`/add-product/${id}`)}
								size="sm"
								variant="primary"
							>
								<Plus
									style={{ height: "16px", width: "16px", marginRight: "4px" }}
								/>
								Adc Item
							</Button>
						</SectionHeader>

						{products.map((product) => (
							<ProductCard key={product.id} $completed={product.completed}>
								<ProductRow>
									<CheckButton
										variant="ghost"
										size="sm"
										onClick={() => toggleProductComplete(product.id)}
										$completed={product.completed}
									>
										{product.completed && (
											<Check style={{ height: "12px", width: "12px" }} />
										)}
									</CheckButton>

									<ProductInfo>
										<ProductName $completed={product.completed}>
											{product.name}
										</ProductName>
										<ProductDetails>
											Qtde: {product.quantity} • ${product.price.toFixed(2)}{" "}
											cada
										</ProductDetails>
									</ProductInfo>

									<ProductPrice>
										${(product.price * product.quantity).toFixed(2)}
									</ProductPrice>

									<ActionButtons>
										<Button
											variant="ghost"
											size="sm"
											style={{ height: "32px", width: "32px", padding: 0 }}
										>
											<Edit3 style={{ height: "16px", width: "16px" }} />
										</Button>
										<Button
											variant="ghost"
											size="sm"
											onClick={() => deleteProduct(product.id)}
											style={{ height: "32px", width: "32px", padding: 0 }}
										>
											<Trash2 style={{ height: "16px", width: "16px" }} />
										</Button>
									</ActionButtons>
								</ProductRow>
							</ProductCard>
						))}
					</ProductsSection>
				</div>

				<Card style={{ padding: "16px" }}>
					<ActionGrid>
						<Button
							variant="outline"
							onClick={() => navigate(`/add-product/${id}`)}
							style={{ height: "48px" }}
						>
							<Plus
								style={{ height: "16px", width: "16px", marginRight: "8px" }}
							/>
							Adc mais itens
						</Button>
						<Button
							onClick={completeCart}
							variant="primary"
							style={{ height: "48px" }}
							disabled={completedItems !== products.length}
						>
							<Check
								style={{ height: "16px", width: "16px", marginRight: "8px" }}
							/>
							Completar compra
						</Button>
					</ActionGrid>
				</Card>
			</Content>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
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

const HeaderInfo = styled.div`
	flex: 1;
`;

const Title = styled.h1`
	font-size: 1.25rem;
	font-weight: 600;
	color: ${({ theme }) => theme.colors.foreground};
`;

const Subtitle = styled.p`
	font-size: 0.875rem;
	color: ${({ theme }) => theme.colors.mutedForeground};
`;

const Content = styled.div`
	padding: 16px;
	display: flex;
	flex: 1;
	flex-direction: column;
	gap: 24px;
`;

const SummaryRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 16px;
`;

const SummaryLeft = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
`;

const IconContainer = styled.div`
	height: 48px;
	width: 48px;
	background: ${({ theme }) => theme.colors.primary}10;
	border-radius: ${({ theme }) => theme.radius};
	display: flex;
	align-items: center;
	justify-content: center;
`;

const SummaryInfo = styled.div``;

const SummaryTitle = styled.h2`
	font-size: 1.125rem;
	font-weight: 600;
	color: ${({ theme }) => theme.colors.foreground};
`;

const SummaryText = styled.p`
	font-size: 0.875rem;
	color: ${({ theme }) => theme.colors.mutedForeground};
`;

const SummaryRight = styled.div`
	text-align: right;
`;

const TotalAmount = styled.p`
	font-size: 1.5rem;
	font-weight: 700;
	color: ${({ theme }) => theme.colors.foreground};
`;

const ProgressRow = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
`;

const ProgressBar = styled.div`
	height: 8px;
	width: 64px;
	background: ${({ theme }) => theme.colors.muted};
	border-radius: 9999px;
	overflow: hidden;
`;

const ProgressFill = styled.div`
	height: 100%;
	background: ${({ theme }) => theme.gradients.primary};
	transition: all 0.3s ease;
`;

const ProgressText = styled.span`
	font-size: 0.75rem;
	color: ${({ theme }) => theme.colors.mutedForeground};
	margin-left: 8px;
`;

const ProductsSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

const SectionHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const SectionTitle = styled.h3`
	font-size: 1.125rem;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.foreground};
`;

const ProductCard = styled(Card)<{ $completed: boolean }>`
	padding: 16px;
	margin-bottom: 8px;
	opacity: ${({ $completed }) => ($completed ? 0.6 : 1)};
`;

const ProductRow = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
`;

const CheckButton = styled(Button)<{ $completed: boolean }>`
	height: 24px;
	width: 24px;
	padding: 0;
	border-radius: 50%;
	border: 2px solid
		${({ $completed, theme }) =>
			$completed ? theme.colors.success : theme.colors.mutedForeground};
	background: ${({ $completed, theme }) =>
		$completed ? theme.colors.success : "transparent"};
	color: ${({ $completed }) => ($completed ? "white" : "inherit")};

	&:hover {
		border-color: ${({ $completed, theme }) =>
			$completed ? theme.colors.success : theme.colors.primary};
	}
`;

const ProductInfo = styled.div`
	flex: 1;
`;

const ProductName = styled.h4<{ $completed: boolean }>`
	font-weight: 500;
	color: ${({ $completed, theme }) =>
		$completed ? theme.colors.mutedForeground : theme.colors.foreground};
	text-decoration: ${({ $completed }) =>
		$completed ? "line-through" : "none"};
`;

const ProductDetails = styled.p`
	font-size: 0.875rem;
	color: ${({ theme }) => theme.colors.mutedForeground};
`;

const ProductPrice = styled.p`
	font-weight: 600;
	color: ${({ theme }) => theme.colors.foreground};
`;

const ActionButtons = styled.div`
	display: flex;
	gap: 4px;
`;

const ActionGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 12px;
`;
