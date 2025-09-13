import styled from 'styled-components';

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radius};
  box-shadow: ${({ theme }) => theme.shadows.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: ${({ theme }) => theme.transitions.smooth};
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.glow};
    transform: translateY(-2px);
  }
`;

export const CardHeader = styled.div`
  padding: 1.5rem 1.5rem 0;
`;

export const CardContent = styled.div`
  padding: 1.5rem;
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1.5rem 1.5rem;
`;

export const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1;
  color: ${({ theme }) => theme.colors.cardForeground};
`;

export const CardDescription = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.mutedForeground};
`;