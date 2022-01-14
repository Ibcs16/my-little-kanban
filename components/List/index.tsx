import { MdAdd } from "react-icons/md";
import Card from "../Card";

import { Container } from "./styles";

import React, { useMemo } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectTodosByStatus } from "../../features/todos/todosSlice";

interface TodoListProps {
  status: string;
}

interface StatusTitle {
  [key: string]: string;
}

export const statusTitle: StatusTitle = {
  todo: "Todo 💭",
  doing: "Doing 🔥",
  done: "Done ✅",
};

const List: React.FC<TodoListProps> = ({ status }) => {
  const todos = useAppSelector(state => selectTodosByStatus(state, status));
  const hasButton = status === "todo";

  if (!status) return null;
  return (
    <Container done={status === "done"}>
      <header>
        <h2>{statusTitle[status] || "No status"}</h2>
        {hasButton && (
          <button type="button">
            <MdAdd size={24} color="#fff" />
          </button>
        )}
      </header>
      <ul>
        {todos.map(todo => (
          <Card key={todo.id} data={todo} />
        ))}
      </ul>
    </Container>
  );
};

export default List;
