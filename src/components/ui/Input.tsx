import styled from 'styled-components';

export const Input = styled.input`
  display: flex;
  height: 2.5rem;
  width: 100%;
  border-radius: calc(${({ theme }) => theme.radius} - 2px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.input};
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  transition: ${({ theme }) => theme.transitions.smooth};
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.mutedForeground};
  }
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.ring}20;
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.foreground};
  
  &[data-disabled] {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;