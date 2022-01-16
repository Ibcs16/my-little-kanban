import React from "react";
import { useAppSelector } from "../../app/hooks";

import { selectAllTodoLists } from "../../features/todos/todosSlice";
import List from "../List";

import { Container } from "./styles";

const Board: React.FC = () => {
  const todoLists = useAppSelector(selectAllTodoLists);
  return (
    <Container>
      {todoLists.map((todoList, index) => (
        <List index={index} key={todoList.statusName} data={todoList} />
      ))}
    </Container>
  );
};

export default Board;
