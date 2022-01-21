import { css } from "@emotion/react";
import styled from "@emotion/styled";

import Icon from "../Icon";

export const Container = styled.aside`
  width: 100%;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.colors.divider};
  grid-area: header;

  display: flex;
  align-items: center;

  justify-content: space-between;
  padding: 8px 24px;

  ${props => props.theme.media.md} {
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
