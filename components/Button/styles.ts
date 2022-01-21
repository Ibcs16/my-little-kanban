import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface ButtonProps {
  hideLabelOnMobile?: boolean;
}

export const Container = styled.button<ButtonProps>`
  padding: 16px 12px;
  border-radius: 4px;
  border: none;
  ${props => props.theme.typography.md.paragraphMdBold}
  display: flex;
  align-items: center;
  gap: 4px;
  background: ${props => props.theme.colors.primary};
  color: white;
  svg {
    color: white;
  }

  max-height: 51px;
  cursor: pointer;
  &:hover,
  &:focus {
    opacity: 0.8;
  }

  span {
    display: block;
    white-space: nowrap;
  }

  ${props =>
    props.hideLabelOnMobile &&
    css`
      span {
        display: none;
        ${props.theme.media.md} {
          display: block;
        }
      }
    `}
`;
