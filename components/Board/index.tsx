import React from "react";
import { DropTargetMonitor } from "react-dnd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import {
  selectAllTodoLists,
  Todo,
  todoStatusChanged,
} from "../../features/todos/todosSlice";
import List from "../List";

import { Container } from "./styles";

const Board: React.FC = () => {
  const todoLists = useAppSelector(selectAllTodoLists);
  const dispatch = useAppDispatch();

  const onDrop = (todo: Todo, monitor: DropTargetMonitor, status: string) => {
    dispatch(todoStatusChanged({ todo, status }));
  };

  return (
    <Container>
      {todoLists.map((todoList, index) => (
        <List
          onDrop={onDrop}
          index={index}
          key={todoList.statusName}
          data={todoList}
        />
      ))}
    </Container>
  );
};

export default Board;
