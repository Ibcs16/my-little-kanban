import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

interface ContainerProps {
  isDragging: boolean;
}

export const Container = styled(motion.div)<ContainerProps>`
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
      border: 2px dashed rgba(0, 0, 0, 0.2);

      border-radius: 2px;
      background: transparent;
      box-shadow: none;
      cursor: grabbing;

      strong {
        opacity: 0;
      }
    `}
`;
