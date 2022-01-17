import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface ContainerProps {
  done?: boolean;
  isDraggingOver?: boolean;
}

export const Container = styled.div<ContainerProps>`
  padding: 0 15px;
  height: 100%;
  flex: 0 0 320px;

  & + div {
    border-left: 1px solid ${({ theme }) => theme.colors.divider};
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 42px;

    h2 {
      font-weight: 500;
      font-size: 16px;
      padding: 0 10px;
    }

    button {
      height: 42px;
      width: 42px;
      border-radius: 18px;
      background: ${({ theme }) => theme.colors.secondary};
      border: 0;
      cursor: pointer;
    }
  }

  ul {
    height: 100%;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    ${props =>
      props.isDraggingOver &&
      css`
        background: yellow;
      `};
  }
`;
