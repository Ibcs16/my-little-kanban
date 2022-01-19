import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface ContainerProps {
  isDragging?: boolean;
}

export const Container = styled.div<ContainerProps>`
  padding: 16px;

  background: white;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.colors.opaque};
  border-radius: 4px;
  cursor: grab;
  position: relative;

  font-weight: 500;

  ${({ theme }) => theme.typography.md.paragraphMdBold}

  color: ${({ theme }) => theme.colors.textSecondary};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
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
