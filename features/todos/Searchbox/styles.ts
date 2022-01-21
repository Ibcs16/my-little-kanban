import styled from "@emotion/styled";
interface ContainerProps {
  focused?: boolean;
}

export const Container = styled.div<ContainerProps>`
  flex: 1;

  height: 51px;
  background: ${({ theme }) => theme.colors.bg01};
  border: 1px solid
    ${({ theme, focused }) => theme.colors[focused ? "primary" : "bg02"]};
  border-radius: 4px;
  padding: 15px 21px;
  display: flex;
  align-items: center;

  input {
    height: 100%;
    flex: 1;
    background: transparent;
    border: none;
    ${({ theme }) => theme.typography.md.input}

    &::placeholder {
      color: ${({ theme }) => theme.colors.textTertiary};
    }
  }

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.tertiary};
  }

  &:focus-within {
    border: 1px solid ${({ theme }) => theme.colors.primary};

    svg {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  svg {
    color: ${({ theme }) => theme.colors.textTertiary};
  }

  ${({ theme }) => theme.media.md} {
    max-width: 276px;
  }
`;
