import React, { useEffect, useRef } from "react";
import Icon from "../../../Icon";
import { TodoList } from "../../../../features/todos/models/todo";

import { Container, Item, menuAnimation } from "./styles";

interface DropDownMenu {
  onToggleItem: (key: string, e: { target: HTMLInputElement }) => void;
  lists: { [id: string]: TodoList };
  filterStatus: string[];
  toggleMenu: () => void;
}

const DropdownMenu: React.FC<DropDownMenu> = ({
  onToggleItem,
  lists,
  filterStatus,
  toggleMenu,
  ...others
}) => {
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }
  }, []);
  return (
    <Container
      variants={menuAnimation}
      animate="visible"
      initial="hidden"
      exit="hidden"
      {...others}
    >
      <input ref={hiddenInputRef} type="hidden" tabIndex={5} />
      <header>
        <strong>Filters:</strong>
        <Icon
          data-testid="filter-dropdown-close-button"
          name="close"
          size={16}
          cursor="pointer"
          onClick={toggleMenu}
        />
      </header>
      <ul>
        {Object.values(lists)
          .sort((a, b) => Number(a.order) - Number(b.order))
          .map(list => (
            <Item
              key={list.statusName}
              checked={filterStatus.includes(list.statusName)}
            >
              <label htmlFor={list.statusName}>
                <input
                  type="checkbox"
                  name={list.statusName}
                  id={list.statusName}
                  checked={filterStatus.includes(list.statusName)}
                  onChange={e => onToggleItem(list.statusName, e)}
                />
                {list.title}
              </label>
            </Item>
          ))}
      </ul>
    </Container>
  );
};

export default DropdownMenu;
