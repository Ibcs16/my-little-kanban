import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

interface ContainerProps {
  isDragging?: boolean;
  loading?: boolean;
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

  transition: all 400ms;

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

  &:hover,
  &:focus-within {
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

  ${props =>
    props.loading &&
    css`
      .actionsMenu {
        display: flex;
      }
    `}
`;

interface TitleEditInputProps {
  show?: boolean;
}

export const TitleEditInput = styled.input<TitleEditInputProps>`
  border: none;

  &:focus {
    border-bottom: 1px solid ${props => props.theme.colors.primary};
  }
  width: 150px;
  background: none;
  padding-bototm: 4px;
`;
