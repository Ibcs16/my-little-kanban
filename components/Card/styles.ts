import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

interface ContainerProps {
  isDragging?: boolean;
}

export const Container = styled.div<ContainerProps>`
  padding: 16px;
  border-radius: 4px;
  background: white;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.colors.opaque};
  cursor: grab;

  font-weight: 500;

  ${props =>
    props.isDragging &&
    css`
      opacity: 0.8;
    `}
`;
