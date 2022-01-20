import { AnimatePresence, useCycle } from "framer-motion";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import {
  checkedFilterStatus,
  selectAllFilterStatus,
  selectAllTodoLists,
  uncheckedFilterStatus,
} from "../../features/todos/todosSlice";
import DropdownMenu from "./components/DropdownMenu";
import FilterButton from "./components/FilterButton";
import Portal from "./components/Portal";
import { Container } from "./styles";

const StatusFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const lists = useAppSelector(selectAllTodoLists);
  const filterStatus = useAppSelector(selectAllFilterStatus);
  const [menuShow, toggleMenu] = useCycle(false, true);

  const onToggleItem = (key: string, e: { target: HTMLInputElement }): void => {
    if (e.target.checked) {
      dispatch(checkedFilterStatus(key));
    } else {
      dispatch(uncheckedFilterStatus(key));
    }
  };

  return (
    <>
      <Container>
        <FilterButton
          onClick={() => toggleMenu()}
          data-testid="filter-toggle-button"
          active={menuShow || !!filterStatus.length}
        />

        <AnimatePresence initial={false} exitBeforeEnter>
          {menuShow && (
            <DropdownMenu
              toggleMenu={() => toggleMenu()}
              onToggleItem={onToggleItem}
              lists={lists}
              filterStatus={filterStatus}
              data-testid="filter-dropdown"
            />
          )}
        </AnimatePresence>
      </Container>
      {menuShow && <Portal onClick={() => toggleMenu()} />}
    </>
  );
};

export default StatusFilter;
