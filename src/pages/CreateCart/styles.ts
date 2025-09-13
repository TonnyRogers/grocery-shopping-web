import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  z-index: 10;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
`;

export const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
`;

export const Content = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

export const CartIconWrapper = styled.div`
  height: 5rem;
  width: 5rem;
  background: ${({ theme }) => theme.gradients.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows.glow};
  color: white;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const DateInputWrapper = styled.div`
  position: relative;
  
  .calendar-icon {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    height: 1rem;
    width: 1rem;
    color: ${({ theme }) => theme.colors.mutedForeground};
  }
`;

export const QuickSelectSection = styled.div`
  margin-top: 8px;
`;

export const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.foreground};
`;

export const QuickSelectGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
`;