import { css } from "@emotion/react";
import styled from "@emotion/styled";

import Icon from "../Icon";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.colors.divider};
  grid-area: header;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 18px 0px 52px;

  nav {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: center;
  }

  svg {
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.tertiary};
    }
  }
`;

interface MenuItemProps {
  active?: boolean;
}

export const MenuItem = styled(Icon)<MenuItemProps>`
  ${props =>
    props.active &&
    css`
      color: ${props.theme.colors.primary};
    `};
`;
