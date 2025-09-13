import {
	ArrowLeft,
	TrendingUp,
	TrendingDown,
	Calendar,
	DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useNavigate } from "react-router-dom";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	ResponsiveContainer,
	BarChart,
	Bar,
} from "recharts";
import styled from "styled-components";

export function Insights() {
	const navigate = useNavigate();

	// Mock data for charts
	const monthlyData = [
		{ month: "Out", amount: 280 },
		{ month: "Nov", amount: 320 },
		{ month: "Dez", amount: 290 },
		{ month: "Jan", amount: 450 },
	];

	const weeklyData = [
		{ week: "Semana 1", amount: 120 },
		{ week: "Semana 2", amount: 95 },
		{ week: "Semana 3", amount: 180 },
		{ week: "Semana 4", amount: 135 },
	];

	const categoryData = [
		{ category: "Beleza", amount: 120, percentage: 35 },
		{ category: "Limpeza", amount: 85, percentage: 25 },
		{ category: "Comida", amount: 70, percentage: 20 },
		{ category: "Medicamentos", amount: 45, percentage: 13 },
		{ category: "Outros", amount: 25, percentage: 7 },
	];

	const currentMonthTotal = 450;
	const lastMonthTotal = 320;
	const percentageChange =
		((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;

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
					<Title>Informações sobre gastos📊</Title>
				</HeaderContent>
			</Header>

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					overflow: "scroll",
					height: "85vh",
					padding: "4px",
				}}
			>
				<Content>
					<SummaryGrid>
						<Card style={{ padding: "16px" }}>
							<SummaryCardContent>
								<IconContainer>
									<DollarSign
										style={{
											height: "20px",
											width: "20px",
											color: "hsl(var(--primary))",
										}}
									/>
								</IconContainer>
								<SummaryInfo>
									<SummaryLabel>Este mês</SummaryLabel>
									<SummaryValue>${currentMonthTotal}</SummaryValue>
								</SummaryInfo>
							</SummaryCardContent>
						</Card>

						<Card style={{ padding: "16px" }}>
							<SummaryCardContent>
								<TrendIconContainer $isPositive={percentageChange > 0}>
									{percentageChange > 0 ? (
										<TrendingUp style={{ height: "20px", width: "20px" }} />
									) : (
										<TrendingDown style={{ height: "20px", width: "20px" }} />
									)}
								</TrendIconContainer>
								<SummaryInfo>
									<SummaryLabel>Vs mês passado</SummaryLabel>
									<TrendValue $isPositive={percentageChange > 0}>
										{percentageChange > 0 ? "+" : ""}
										{percentageChange.toFixed(1)}%
									</TrendValue>
								</SummaryInfo>
							</SummaryCardContent>
						</Card>
					</SummaryGrid>

					<Card style={{ padding: "24px" }}>
						<ChartTitle>Tendência de gastos mensais</ChartTitle>
						<ChartContainer>
							<ResponsiveContainer width="100%" height="100%">
								<LineChart data={monthlyData}>
									<CartesianGrid
										strokeDasharray="3 3"
										stroke="hsl(var(--border))"
									/>
									<XAxis
										dataKey="month"
										stroke="hsl(var(--muted-foreground))"
										fontSize={12}
									/>
									<YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
									<Line
										type="monotone"
										dataKey="amount"
										stroke="hsl(var(--primary))"
										strokeWidth={3}
										dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 6 }}
									/>
								</LineChart>
							</ResponsiveContainer>
						</ChartContainer>
					</Card>

					<Card style={{ padding: "24px" }}>
						<ChartTitle>Análise semanal deste mês</ChartTitle>
						<ChartContainer>
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={weeklyData}>
									<CartesianGrid
										strokeDasharray="3 3"
										stroke="hsl(var(--border))"
									/>
									<XAxis
										dataKey="week"
										stroke="hsl(var(--muted-foreground))"
										fontSize={12}
									/>
									<YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
									<Bar
										dataKey="amount"
										fill="hsl(var(--primary))"
										radius={[4, 4, 0, 0]}
									/>
								</BarChart>
							</ResponsiveContainer>
						</ChartContainer>
					</Card>

					<Card style={{ padding: "24px" }}>
						<ChartTitle>Spending by Category</ChartTitle>
						<CategoryList>
							{categoryData.map((category) => (
								<CategoryItem key={category.category}>
									<CategoryInfo>
										<CategoryHeader>
											<CategoryName>{category.category}</CategoryName>
											<CategoryAmount>${category.amount}</CategoryAmount>
										</CategoryHeader>
										<ProgressBarContainer>
											<ProgressBarFill
												style={{ width: `${category.percentage}%` }}
											/>
										</ProgressBarContainer>
									</CategoryInfo>
									<CategoryPercentage>
										{category.percentage}%
									</CategoryPercentage>
								</CategoryItem>
							))}
						</CategoryList>
					</Card>

					<StatsGrid>
						<Card style={{ padding: "16px", textAlign: "center" }}>
							<Calendar
								style={{
									height: "32px",
									width: "32px",
									color: "hsl(var(--primary))",
									margin: "0 auto 8px",
								}}
							/>
							<StatLabel>Média por compra</StatLabel>
							<StatValue>$112.50</StatValue>
						</Card>

						<Card style={{ padding: "16px", textAlign: "center" }}>
							<TrendingUp
								style={{
									height: "32px",
									width: "32px",
									color: "hsl(var(--primary))",
									margin: "0 auto 8px",
								}}
							/>
							<StatLabel>Compras</StatLabel>
							<StatValue>4 este mês</StatValue>
						</Card>
					</StatsGrid>
				</Content>
			</div>
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

const SummaryGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 16px;
`;

const SummaryCardContent = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
`;

const IconContainer = styled.div`
	height: 40px;
	width: 40px;
	background: ${({ theme }) => theme.colors.primary}10;
	border-radius: ${({ theme }) => theme.radius};
	display: flex;
	align-items: center;
	justify-content: center;
`;

const TrendIconContainer = styled.div<{ $isPositive: boolean }>`
	height: 40px;
	width: 40px;
	border-radius: ${({ theme }) => theme.radius};
	display: flex;
	align-items: center;
	justify-content: center;
	background: ${({ $isPositive, theme }) =>
		$isPositive ? theme.colors.warning + "10" : theme.colors.success + "10"};
	color: ${({ $isPositive, theme }) =>
		$isPositive ? theme.colors.warning : theme.colors.success};
`;

const SummaryInfo = styled.div``;

const SummaryLabel = styled.p`
	font-size: 0.875rem;
	color: ${({ theme }) => theme.colors.mutedForeground};
`;

const SummaryValue = styled.p`
	font-size: 1.25rem;
	font-weight: 700;
	color: ${({ theme }) => theme.colors.foreground};
`;

const TrendValue = styled.p<{ $isPositive: boolean }>`
	font-size: 1.25rem;
	font-weight: 700;
	color: ${({ $isPositive, theme }) =>
		$isPositive ? theme.colors.warning : theme.colors.success};
`;

const ChartTitle = styled.h3`
	font-size: 1.125rem;
	font-weight: 600;
	margin-bottom: 16px;
	color: ${({ theme }) => theme.colors.foreground};
`;

const ChartContainer = styled.div`
	height: 192px;
`;

const CategoryList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

const CategoryItem = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
`;

const CategoryInfo = styled.div`
	flex: 1;
`;

const CategoryHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 4px;
`;

const CategoryName = styled.span`
	font-size: 0.875rem;
	font-weight: 500;
	color: ${({ theme }) => theme.colors.foreground};
`;

const CategoryAmount = styled.span`
	font-size: 0.875rem;
	color: ${({ theme }) => theme.colors.mutedForeground};
`;

const ProgressBarContainer = styled.div`
	height: 8px;
	background: ${({ theme }) => theme.colors.muted};
	border-radius: 9999px;
	overflow: hidden;
`;

const ProgressBarFill = styled.div`
	height: 100%;
	background: ${({ theme }) => theme.gradients.primary};
	transition: all 0.3s ease;
`;

const CategoryPercentage = styled.span`
	font-size: 0.75rem;
	color: ${({ theme }) => theme.colors.mutedForeground};
`;

const StatsGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 16px;
`;

const StatLabel = styled.p`
	font-size: 0.875rem;
	color: ${({ theme }) => theme.colors.mutedForeground};
`;

const StatValue = styled.p`
	font-size: 1.25rem;
	font-weight: 700;
	color: ${({ theme }) => theme.colors.foreground};
`;
