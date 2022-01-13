import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { statusTitle } from "./TodoList";
import {
  checkedFilterStatus,
  selectAllFilterStatus,
  uncheckedFilterStatus,
} from "./todosSlice";

// import { Container } from './styles';

const StatusFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const filterStatus = useAppSelector(selectAllFilterStatus);
  const onToggle = (key: string, e) => {
    if (e.target.checked) {
      dispatch(checkedFilterStatus(key));
    } else {
      dispatch(uncheckedFilterStatus(key));
    }
  };
  return (
    <div>
      {Object.entries(statusTitle).map(([key, status]) => (
        <label htmlFor={key} key={key}>
          <input
            type="checkbox"
            name={`filter-checkbox-${key}`}
            id={`filter-checkbox-${key}`}
            checked={filterStatus.includes(key)}
            onChange={e => onToggle(key, e)}
          />
          {status}
        </label>
      ))}
    </div>
  );
};

export default StatusFilter;
