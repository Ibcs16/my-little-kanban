import styled from "@emotion/styled";
interface ContainerProps {
  focused?: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  height: 40px;
  background: ${({ theme }) => theme.colors.bg01};
  border: 1px solid
    ${({ theme, focused }) => theme.colors[focused ? "primary" : "bg02"]};
  border-radius: 4px;
  padding: 10px 15px;
  display: flex;
  align-items: center;

  ${props => props.theme.media.md} {
    height: 51px;
  }

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
`;
