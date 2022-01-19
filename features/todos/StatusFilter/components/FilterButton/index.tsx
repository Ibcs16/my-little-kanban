import React from "react";
import Icon from "../../../../../components/Icon";

import { Container } from "./styles";

interface FilterButtonProps {
  onClick: () => void;
  active: boolean;
}

const FilterButton: React.FC<FilterButtonProps> = ({ active, onClick }) => {
  return (
    <Container active={active} onClick={onClick}>
      <Icon name="filter" size={32} cursor={"pointer"} />
    </Container>
  );
};

export default FilterButton;
