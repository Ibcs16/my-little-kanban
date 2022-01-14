import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectTodoById, Todo } from "./todosSlice";

// import { Container } from './styles';

interface TodoItemProps extends Todo {}

const TodoItem: React.FC<TodoItemProps> = ({ id, title }) => {
  if (!id) return null;
  return (
    <li>
      <strong>{title || "Unknow"}</strong>
    </li>
  );
};

export default TodoItem;
