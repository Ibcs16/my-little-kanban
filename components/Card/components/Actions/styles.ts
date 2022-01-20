import styled from "@emotion/styled";

export const Container = styled.div`
  display: none;
  gap: 4px;

  button {
    border: 1px solid transparent;
    padding: 4px;
    background: none;
    transition: all 200ms;
  }

  svg {
    color: ${props => props.theme.colors.textSecondary};
    transition: all 200ms;
  }

  .actions {
    svg {
      color: ${props => props.theme.colors.primary};
      opacity: 0.5;
    }
    button {
      &:hover {
        svg {
          color: ${props => props.theme.colors.primary};
          opacity: 1;
        }
      }
    }
`;
