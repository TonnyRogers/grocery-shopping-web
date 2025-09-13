import { Plus, ShoppingCart, TrendingUp, Calendar } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useShoppingCartContext from "@/hooks/use-shopping-cart-context";


export function Dashboard() {
  const navigate = useNavigate();
  const {
    items,
    pastItems,
  } = useShoppingCartContext();

  const totalSpentThisMonth = pastItems
    .filter(cart => cart.completed)
    .reduce((sum, cart) => sum + cart.total, 0);

  const activeCarts = items.filter((cart) => !cart.completed);
  const completedCarts = items.filter((cart) => cart.completed);

  return (
    <Container>
      {/* Header */}
      <Header>
        <HeaderContent>
          <Title>Olá!👋</Title>
          <Subtitle>Pronto para sua próxima ida às compras?</Subtitle>
        </HeaderContent>
        <TotalBadge>
          <TrendingUp className="h-4 w-4" />
          <span>${totalSpentThisMonth.toFixed(2)}</span>
        </TotalBadge>
      </Header>

      {/* Quick Actions */}
      <QuickActions>
        <Button 
          variant="primary"
          onClick={() => navigate("/create-cart")}
        >
          <Plus className="h-6 w-6" />
          <span>Novo Carrinho</span>
        </Button>
        <Button 
          variant="outline" 
          onClick={() => navigate("/insights")}
        >
          <TrendingUp className="h-6 w-6" />
          <span>Métricas</span>
        </Button>
      </QuickActions>

      {/* Active Carts */}
      {activeCarts.length > 0 && (
        <Section>
          <SectionTitle>Carrinhos Ativos</SectionTitle>
          <CartsGrid>
            {activeCarts.map((cart) => (
              <CartCard 
                key={cart.id} 
                onClick={() => navigate(`/cart/${cart.id}`)}
              >
                <CartContent>
                  <CartLeft>
                    <CartIcon $variant="primary">
                      <ShoppingCart className="h-5 w-5" />
                    </CartIcon>
                    <CartDetails>
                      <CartName>{cart.name}</CartName>
                      <CartMeta>
                        {cart.itemCount} itens
                      </CartMeta>
                    </CartDetails>
                  </CartLeft>
                  <CartRight>
                    <CartTotal>${cart.total.toFixed(2)}</CartTotal>
                    <CartDate>
                      <Calendar className="h-3 w-3" />
                      {cart.date}
                    </CartDate>
                  </CartRight>
                </CartContent>
              </CartCard>
            ))}
          </CartsGrid>
        </Section>
      )}

      {/* Recent Completed Carts */}
      <Section>
        <SectionTitle>Compras Recentes</SectionTitle>
        <CartsGrid>
          {completedCarts.slice(0, 3).map((cart) => (
            <CartCard 
              key={cart.id} 
              $completed
              onClick={() => navigate(`/cart/${cart.id}`)}
            >
              <CartContent>
                <CartLeft>
                  <CartIcon $variant="success">
                    <ShoppingCart className="h-5 w-5" />
                  </CartIcon>
                  <CartDetails>
                    <CartName>{cart.name}</CartName>
                    <CartMeta>
                      {cart.itemCount} itens • Finalizada
                    </CartMeta>
                  </CartDetails>
                </CartLeft>
                <CartRight>
                  <CartTotal>${cart.total.toFixed(2)}</CartTotal>
                  <CartDate>
                    <Calendar className="h-3 w-3" />
                    {cart.date}
                  </CartDate>
                </CartRight>
              </CartContent>
            </CartCard>
          ))}
        </CartsGrid>
      </Section>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 1rem;
  padding-bottom: 5rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const HeaderContent = styled.div``;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

const TotalBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${({ theme }) => theme.colors.primary}1a;
  padding: 0.5rem 0.75rem;
  border-radius: ${({ theme }) => theme.radius};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  font-size: 0.875rem;
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  ${Button} {
    height: 5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.foreground};
`;

const CartsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const CartCard = styled(Card)<{ $completed?: boolean }>`
  padding: 1rem;
  cursor: pointer;
  opacity: ${({ $completed }) => $completed ? 0.75 : 1};
`;

const CartContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CartLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const CartIcon = styled.div<{ $variant: 'primary' | 'success' }>`
  height: 2.5rem;
  width: 2.5rem;
  background-color: ${({ theme, $variant }) => 
    $variant === 'primary' 
      ? `${theme.colors.primary}1a` 
      : `${theme.colors.success}1a`
  };
  border-radius: ${({ theme }) => theme.radius};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, $variant }) => 
    $variant === 'primary' 
      ? theme.colors.primary 
      : theme.colors.success
  };
`;

const CartDetails = styled.div``;

const CartName = styled.h3`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.foreground};
`;

const CartMeta = styled.p`
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
  gap: 0.25rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.mutedForeground};
`;
