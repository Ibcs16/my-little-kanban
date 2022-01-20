import { css } from "@emotion/react";
import styled from "@emotion/styled";
interface ContainerProps {
  active?: boolean;
}
export const Container = styled.button<ContainerProps>`
  background: none;
  border: none;
  height: fit-content;

  svg {
    margin-top: 10px;
  }

  &:focus,
  &:hover {
    svg {
      color: ${props => props.theme.colors.primary};
    }
  }
  ${props =>
    props.active &&
    css`
      svg {
        color: ${props.theme.colors.primary};
      }
    `}
`;
