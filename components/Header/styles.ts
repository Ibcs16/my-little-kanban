import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

import Icon from "../Icon";

export const Container = styled(motion.aside)`
  width: 100%;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.colors.divider};
  grid-area: header;
  position: relative;

  display: flex;
  align-items: center;

  justify-content: space-between;
  padding: 8px 24px;

  ${props => props.theme.media.md} {
    height: 100vh;
    flex-direction: column;
    align-items: center;
    padding: 18px 0px 52px;
  }

  nav {
    flex: 0.7;
    display: flex;
    gap: 0px;
    align-items: center;
    justify-content: space-between;

    ${props => props.theme.media.md} {
      justify-content: start;
      flex-direction: column;
      align-items: center;
      gap: 24px;
      padding: 18px 0px 52px;
    }
  }

  svg {
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.tertiary};
    }
  }

  ${({ theme }) => theme.media.sm} {
    &::before {
      position: absolute;
      content: "";
      width: 100%;
      height: 5px;
      left: 0;
      bottom: 0;

      background: ${({ theme }) => theme.colors.bg02};
      border-radius: 2px;
    }
  }
`;

interface MenuItemProps {
  active?: boolean;
}

export const MenuItem = styled(Icon)<MenuItemProps>`
  position: relative;
  ${props =>
    props.active &&
    css`
      color: ${props.theme.colors.primary};
    `};
`;

export const MenuItemUnderline = styled(motion.div)`
  position: absolute;
  width: 71px;
  height: 5px;
  left: -25px;
  bottom: -12px;
  border-radius: 2px;
  background: ${props => props.theme.colors.bg02};
  ${({ theme }) => theme.media.md} {
    display: none;
  }
`;
