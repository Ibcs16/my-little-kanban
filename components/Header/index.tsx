import { useTheme } from "@emotion/react";
import { AnimateSharedLayout, motion } from "framer-motion";

import React, { useState } from "react";
import Icon from "../Icon";

import { Container, MenuItem, MenuItemUnderline } from "./styles";

const menuItems = [
  { page: "todos", icon: "list" },
  { page: "calendar", icon: "calendar" },
  { page: "notifications", icon: "bell" },
];

interface HeaderItemProps {
  active: boolean;
  name: string;
  onClick?: () => void;
}

const spring = {
  type: "spring",
  stiffness: 500,
  damping: 30,
};

const HeaderItem: React.FC<HeaderItemProps> = ({ name, active, ...others }) => {
  const theme = useTheme();
  return (
    <div style={{ position: "relative" }}>
      <MenuItem name={name} size={24} active={active} {...others} />
      {active && (
        <MenuItemUnderline
          layoutId="underline"
          initial={false}
          animate={{ background: theme.colors.primary }}
          transition={spring}
        />
      )}
    </div>
  );
};

const Header: React.FC = () => {
  const [activePage, setActivePage] = useState("todos");
  return (
    <Container>
      {/* <div>Logo</div> */}
      <nav>
        {menuItems.map(({ page, icon }, index) => (
          // <Link key={page} href={`/${page}`} passHref>
          <HeaderItem
            key={page}
            name={page}
            active={activePage === page}
            onClick={() => setActivePage(page)}
          />
          // </Link>
        ))}
      </nav>
      <HeaderItem
        name={"settings"}
        active={activePage === "settings"}
        onClick={() => setActivePage("settings")}
      />
    </Container>
  );
};

export default Header;
