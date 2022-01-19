import styled from "@emotion/styled";
interface ContainerProps {
  focused?: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  max-width: 276px;
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
    ${({ theme }) => theme.typograhy.md.input}

    &::placeholder {
      color: ${({ theme }) => theme.colors.textTertiary};
    }
  }

  svg {
    color: ${({ theme, focused }) =>
      theme.colors[focused ? "primary" : "textTertiary"]};
  }
`;