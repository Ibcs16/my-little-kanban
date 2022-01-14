import React, { useMemo } from "react";
import { useAppSelector } from "../../app/hooks";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";
import { selectAllTodos, selectTodosByStatus } from "./todosSlice";

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

const TodoList: React.FC<TodoListProps> = ({ status }) => {
  const todos = useAppSelector(state => selectTodosByStatus(state, status));

  if (!status) return null;

  return (
    <div>
      <div>
        <h3>{statusTitle[status] || "No status"}</h3>
        <ul>
          {todos.map(todo => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </ul>
        <AddTodo status={status} />
      </div>
    </div>
  );
};

export default TodoList;
