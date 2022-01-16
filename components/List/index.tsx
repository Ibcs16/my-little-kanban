import { MdAdd } from "react-icons/md";
import Card from "../Card";

import { Container } from "./styles";

import React, { useMemo } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectTodosByStatus, TodoList } from "../../features/todos/todosSlice";

interface TodoListProps {
  data: TodoList;
  index: number;
}

interface StatusTitle {
  [key: string]: string;
}

export const statusTitle: StatusTitle = {
  todo: "Todo 💭",
  doing: "Doing 🔥",
  done: "Done ✅",
};

const List: React.FC<TodoListProps> = ({ data, index }) => {
  const { statusName, title } = data;
  const todos = useAppSelector(state => selectTodosByStatus(state, statusName));

  const hasButton = statusName === "todo";

  if (!statusName) return null;

  return (
    <Container done={statusName === "done"}>
      <header>
        <h2>{title || "No status"}</h2>
        {hasButton && (
          <button type="button">
            <MdAdd size={24} color="#fff" />
          </button>
        )}
      </header>
      <ul>
        {todos.map((todo, cardIndex) => (
          <Card key={todo.id} data={todo} index={cardIndex} listIndex={index} />
        ))}
      </ul>
    </Container>
  );
};

export default List;
