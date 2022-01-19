import styled from "@emotion/styled";

export const Container = styled.dialog`
  display: flex;
  flex-direction: column;
  width: 320px;
  border-radius: 4px;
  background: white;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.colors.bg02};
  position: absolute;
  font-size: 14px;
  z-index: 2;

  header {
    display: flex;
    align-items: center;

    strong {
      display: box;
      flex: 1;
    }
    width: 100%;
    text-align: center;
    background-color: ${props => props.theme.colors.bg01};
    color: ${props => props.theme.colors.textSecondary};
    padding: 8px;
  }

  ul {
    padding: 8px;
  }

  li label input {
    margin-right: 8px;
  }
`;

interface ItemProps {
  checked?: boolean;
}

export const Item = styled.li<ItemProps>`
  label {
    ${props => props.theme.typography.md.extraMd}
    color: ${props =>
      props.theme.colors[props.checked ? "text" : "textSecondary"]};
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    &:hover {
      color: ${props => props.theme.colors.text};
    }
  }
`;
