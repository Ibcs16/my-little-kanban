import Link from "next/link";
import React, { useState } from "react";
import Icon from "../Icon";

import { Container, MenuItem } from "./styles";

const menuItems = [
  { page: "todos", icon: "list" },
  { page: "calendar", icon: "calendar" },
  { page: "notifications", icon: "bell" },
];

const Header: React.FC = () => {
  const [activePage, setActivePage] = useState("todos");
  return (
    <Container>
      {/* <div>Logo</div> */}
      <nav>
        {menuItems.map(({ page, icon }) => (
          <Link key={page} href={`/${page}`} passHref>
            <MenuItem name={page} size={24} active={activePage === page} />
          </Link>
        ))}
      </nav>
      <Icon size={24} name="settings" />
    </Container>
  );
};

export default Header;
