import React from "react";
import TodoList from "../../features/todos/TodoList";
import List from "../List";

import { Container } from "./styles";

const Board: React.FC = () => {
  return (
    <Container>
      <List status="todo" />
      <List status="doing" />
      <List status="done" />
    </Container>
  );
};

export default Board;
