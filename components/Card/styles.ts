import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

interface ContainerProps {
  isDragging?: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  height: 48px;

  background: white;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.colors.opaque};
  border-radius: 4px;
  cursor: grab;
  position: relative;

  font-weight: 500;

  .content {
    width: 150px;

    strong {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  strong,
  input {
    ${({ theme }) => theme.typography.md.paragraphMdBold}
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  strong {
    display: block;
    transition: all 300ms;
  }

  .actionsMenu {
    display: none;
  }

  &:hover {
    strong {
      color: ${({ theme }) => theme.colors.primary};
    }
    background: ${({ theme }) => theme.colors.secondary};
    &::before {
      content: "";
      position: absolute;
      background: ${({ theme }) => theme.colors.primary};
      width: 100%;
      height: 2px;
      border-radius: 4px;
      left: 0;
      top: 0;
    }

    .actionsMenu {
      display: flex;
    }
  }

  ${props =>
    props.isDragging &&
    css`
      background: ${props.theme.colors.secondary};
      &::before {
        content: "";
        position: absolute;
        background: ${props.theme.colors.primary};
        width: 100%;
        height: 2px;
        border-radius: 4px;
        left: 0;
        top: 0;
      }
      opacity: 0.8;
    `}
`;
