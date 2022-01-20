import React from "react";
import Icon from "../../../Icon";

import { Container } from "./styles";

interface FilterButtonProps {
  onClick: () => void;
  active: boolean;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  active,
  onClick,
  ...others
}) => {
  return (
    <Container active={active} onClick={onClick} {...others}>
      <Icon
        data-testid="filter-toggle-svg"
        name="filter"
        size={32}
        cursor={"pointer"}
      />
    </Container>
  );
};

export default FilterButton;
