import { useState } from "react";
import { Plus, ShoppingCart, Calendar, Search } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useShoppingCartContext from "@/hooks/use-shopping-cart-context";

interface ShoppingCart {
	id: string;
	name: string;
	date: string;
	total: number;
	itemCount: number;
	completed: boolean;
}

export function CartsOverview() {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState("");
	const { items } = useShoppingCartContext();

	const filteredCarts = items.filter((cart) =>
		cart.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const activeCarts = filteredCarts.filter((cart) => !cart.completed);
	const completedCarts = filteredCarts.filter((cart) => cart.completed);

	return (
		<Container>
			<Header>
				<HeaderContent>
					<HeaderTop>
						<Title>Lista de Carrinhos</Title>
						<Button
							onClick={() => navigate("/create-cart")}
							size="sm"
							variant="primary"
						>
							<Plus
								style={{ height: "16px", width: "16px", marginRight: "4px" }}
							/>
							Novo Carrinho
						</Button>
					</HeaderTop>

					<SearchContainer>
						<Search
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
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							placeholder="Buscar carrinho..."
							style={{ paddingLeft: "40px" }}
						/>
					</SearchContainer>
				</HeaderContent>
			</Header>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					overflow: "scroll",
					height: "73vh",
					padding: "4px",
				}}
			>
				<Content>
					{activeCarts.length > 0 && (
						<Section>
							<SectionTitle>
								Compras em andamento ({activeCarts.length})
							</SectionTitle>
							<CartsList>
								{activeCarts.map((cart) => (
									<CartCard
										key={cart.id}
										onClick={() => navigate(`/cart/${cart.id}`)}
									>
										<CartContent>
											<CartLeft>
												<ActiveCartIcon>
													<ShoppingCart
														style={{
															height: "24px",
															width: "24px",
															color: "hsl(var(--primary))",
														}}
													/>
												</ActiveCartIcon>
												<CartInfo>
													<CartName>{cart.name}</CartName>
													<CartStatus>
														{cart.itemCount} itens • Em progresso
													</CartStatus>
												</CartInfo>
											</CartLeft>
											<CartRight>
												<CartTotal>${cart.total.toFixed(2)}</CartTotal>
												<CartDate>
													<Calendar style={{ height: "12px", width: "12px" }} />
													{cart.date}
												</CartDate>
											</CartRight>
										</CartContent>
									</CartCard>
								))}
							</CartsList>
						</Section>
					)}

					<Section>
						<SectionTitle>
							Compras finalizadas ({completedCarts.length})
						</SectionTitle>
						<CartsList>
							{completedCarts.map((cart) => (
								<CompletedCartCard
									key={cart.id}
									onClick={() => navigate(`/cart/${cart.id}`)}
								>
									<CartContent>
										<CartLeft>
											<CompletedCartIcon>
												<ShoppingCart
													style={{
														height: "24px",
														width: "24px",
														color: "hsl(var(--success))",
													}}
												/>
											</CompletedCartIcon>
											<CartInfo>
												<CartName>{cart.name}</CartName>
												<CartStatus>
													{cart.itemCount} itens • Finalizada
												</CartStatus>
											</CartInfo>
										</CartLeft>
										<CartRight>
											<CartTotal>${cart.total.toFixed(2)}</CartTotal>
											<CartDate>
												<Calendar style={{ height: "12px", width: "12px" }} />
												{cart.date}
											</CartDate>
										</CartRight>
									</CartContent>
								</CompletedCartCard>
							))}
						</CartsList>
					</Section>

					{filteredCarts.length === 0 && (
						<EmptyState>
							<EmptyStateIcon>
								<ShoppingCart
									style={{
										height: "40px",
										width: "40px",
										color: "hsl(var(--muted-foreground))",
									}}
								/>
							</EmptyStateIcon>
							<EmptyStateTitle>
								{searchTerm ? "No carts found" : "No shopping carts yet"}
							</EmptyStateTitle>
							<EmptyStateText>
								{searchTerm
									? `No carts match "${searchTerm}"`
									: "Create your first shopping cart to get started"}
							</EmptyStateText>
							<Button
								onClick={() => navigate("/create-cart")}
								variant="primary"
							>
								<Plus
									style={{ height: "16px", width: "16px", marginRight: "8px" }}
								/>
								Create Your First Cart
							</Button>
						</EmptyState>
					)}
				</Content>
			</div>
		</Container>
	);
}

const Container = styled.div`
	min-height: 100vh;
	background: ${({ theme }) => theme.colors.background};
	padding-bottom: 80px;
`;

const Header = styled.div`
	position: sticky;
	top: 0;
	background: ${({ theme }) => theme.colors.background};
	border-bottom: 1px solid ${({ theme }) => theme.colors.border};
	z-index: 10;
`;

const HeaderContent = styled.div`
	padding: 16px;
`;

const HeaderTop = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 16px;
`;

const Title = styled.h1`
	font-size: 1.5rem;
	font-weight: 700;
	color: ${({ theme }) => theme.colors.foreground};
`;

const SearchContainer = styled.div`
	position: relative;
`;

const Content = styled.div`
	padding: 16px;
	display: flex;
	flex-direction: column;
	gap: 24px;
`;

const Section = styled.div``;

const SectionTitle = styled.h2`
	font-size: 1.125rem;
	font-weight: 600;
	margin-bottom: 12px;
	color: ${({ theme }) => theme.colors.foreground};
`;

const CartsList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

const CartCard = styled(Card)`
	padding: 16px;
	cursor: pointer;
`;

const CompletedCartCard = styled(Card)`
	padding: 16px;
	cursor: pointer;
	opacity: 0.8;
`;

const CartContent = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const CartLeft = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
`;

const ActiveCartIcon = styled.div`
	height: 48px;
	width: 48px;
	background: ${({ theme }) => theme.colors.primary}10;
	border-radius: ${({ theme }) => theme.radius};
	display: flex;
	align-items: center;
	justify-content: center;
`;

const CompletedCartIcon = styled.div`
	height: 48px;
	width: 48px;
	background: ${({ theme }) => theme.colors.success}10;
	border-radius: ${({ theme }) => theme.radius};
	display: flex;
	align-items: center;
	justify-content: center;
`;

const CartInfo = styled.div``;

const CartName = styled.h3`
	font-weight: 500;
	color: ${({ theme }) => theme.colors.foreground};
`;

const CartStatus = styled.p`
	font-size: 0.875rem;
	color: ${({ theme }) => theme.colors.mutedForeground};
`;

const CartRight = styled.div`
	text-align: right;
`;

const CartTotal = styled.p`
	font-weight: 600;
	color: ${({ theme }) => theme.colors.foreground};
`;

const CartDate = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
	font-size: 0.75rem;
	color: ${({ theme }) => theme.colors.mutedForeground};
`;

const EmptyState = styled.div`
	text-align: center;
	padding: 48px 0;
`;

const EmptyStateIcon = styled.div`
	height: 80px;
	width: 80px;
	background: ${({ theme }) => theme.colors.muted};
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 auto 16px;
`;

const EmptyStateTitle = styled.h3`
	font-size: 1.125rem;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.foreground};
	margin-bottom: 8px;
`;

const EmptyStateText = styled.p`
	color: ${({ theme }) => theme.colors.mutedForeground};
	margin-bottom: 24px;
`;
