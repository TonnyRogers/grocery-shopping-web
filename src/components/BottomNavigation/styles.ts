import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.card};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  z-index: 50;
`;

export const NavGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
`;

export const SpecialButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.5rem;
`;

export const NavButton = styled.button<{ $active: boolean }>`
  height: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.smooth};
  color: ${({ theme, $active }) => 
    $active 
      ? theme.colors.primary 
      : theme.colors.mutedForeground
  };
  background-color: ${({ theme, $active }) => 
    $active 
      ? `${theme.colors.primary}0d`
      : 'transparent'
  };
  
  &:hover {
    color: ${({ theme }) => theme.colors.foreground};
  }
`;

export const NavLabel = styled.span`
  font-size: 0.75rem;
`;