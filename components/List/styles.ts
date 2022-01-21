import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface ContainerProps {
  done?: boolean;
  isDraggingOver?: boolean;
}

export const Container = styled.div<ContainerProps>`
  padding: 8px 16px;
  height: 100%;
  flex: 0 0 320px;
  background: ${({ theme }) => theme.colors.bg01};
  border: 2px solid ${props => props.theme.colors.bg01};
  border-radius: 10px;
  transition: all 200ms;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 42px;

    h2 {
      ${props => props.theme.typography.md.headingMd}
    }

    .titleWrapper {
      display: flex;
      align-items: center;
      gap: 12px;

      .tasksCount {
        color: ${props => props.theme.colors.textSecondary};
        background: ${props => props.theme.colors.bg02};
        padding: 5px;
        border-radius: 2px;
        ${props => props.theme.typography.md.extra}
      }
    }

    button {
      cursor: pointer;
      background: transparent;
      border: none;
      color: ${props => props.theme.colors.textSecondary};
    }
  }

  ul {
    height: 100%;

    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
  }

  ${props =>
    props.isDraggingOver &&
    css`
      border: 2px dashed ${props.theme.colors.primary};
    `};
  ${props =>
    props.done &&
    css`
      opacity: 0.2;
    `};
`;

export const AddTodoText = styled.div`
  ${props => props.theme.typography.md.extra}
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;

  cursor: pointer;

  &,
  svg {
    color: ${props => props.theme.colors.textTertiary};
    transition: all 300ms;
  }

  &:hover,
  &:hover svg {
    color: ${props => props.theme.colors.textSecondary};
  }
`;
