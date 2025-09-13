import styled, { css } from 'styled-components';
import { type Theme } from '../../theme/theme';

interface ButtonProps {
  variant?: 'default' | 'outline' | 'ghost' | 'primary';
  size?: 'sm' | 'default' | 'lg';
  disabled?: boolean;
}

const getVariantStyles = (variant: string = 'default', theme: Theme) => {
  switch (variant) {
    case 'primary':
      return css`
        background: ${theme.gradients.primary};
        color: ${theme.colors.primaryForeground};
        box-shadow: ${theme.shadows.soft};
        
        &:hover {
          box-shadow: ${theme.shadows.glow};
          transform: scale(1.05);
        }
      `;
    case 'outline':
      return css`
        background: transparent;
        color: ${theme.colors.foreground};
        border: 1px solid ${theme.colors.border};
        
        &:hover {
          background: ${theme.colors.accent};
        }
      `;
    case 'ghost':
      return css`
        background: transparent;
        color: ${theme.colors.foreground};
        
        &:hover {
          background: ${theme.colors.accent};
        }
      `;
    default:
      return css`
        background: ${theme.colors.primary};
        color: ${theme.colors.primaryForeground};
        
        &:hover {
          background: ${theme.colors.primaryDark};
        }
      `;
  }
};

const getSizeStyles = (size: string = 'default') => {
  switch (size) {
    case 'sm':
      return css`
        height: 2rem;
        padding: 0 0.75rem;
        font-size: 0.875rem;
      `;
    case 'lg':
      return css`
        height: 3rem;
        padding: 0 2rem;
        font-size: 1rem;
      `;
    default:
      return css`
        height: 2.5rem;
        padding: 0 1rem;
        font-size: 0.875rem;
      `;
  }
};

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius};
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.bounce};
  
  ${({ variant, theme }) => getVariantStyles(variant, theme)}
  ${({ size }) => getSizeStyles(size)}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.ring};
  }
`;