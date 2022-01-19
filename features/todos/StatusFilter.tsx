import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { statusTitle } from "./TodoList";
import {
  checkedFilterStatus,
  selectAllFilterStatus,
  selectAllTodoLists,
  uncheckedFilterStatus,
} from "./todosSlice";

// import { Container } from './styles';

const StatusFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const lists = useAppSelector(selectAllTodoLists);
  const filterStatus = useAppSelector(selectAllFilterStatus);
  const onToggle = (key: string, e: { target: HTMLInputElement }) => {
    if (e.target.checked) {
      dispatch(checkedFilterStatus(key));
    } else {
      dispatch(uncheckedFilterStatus(key));
    }
  };
  return (
    <div>
      <strong>Filters:</strong>
      {Object.values(lists)
        .sort((a, b) => Number(a.order) - Number(b.order))
        .map(list => (
          <label htmlFor={list.statusName} key={list.statusName}>
            <input
              type="checkbox"
              name={`filter-checkbox-${list.statusName}`}
              id={`filter-checkbox-${list.statusName}`}
              checked={filterStatus.includes(list.statusName)}
              onChange={e => onToggle(list.statusName, e)}
            />
            {list.title}
          </label>
        ))}
    </div>
  );
};

export default StatusFilter;
