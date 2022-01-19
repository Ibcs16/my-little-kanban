import { MdAdd } from "react-icons/md";
import Card, { ITEM_TYPE } from "../Card";

import { Container } from "./styles";

import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectAllTodos } from "../../features/todos/todosSlice";

import { Droppable } from "react-beautiful-dnd";
import { TodoList } from "../../features/todos/models/todo";

interface TodoListProps {
  data: TodoList;
}

const List: React.FC<TodoListProps> = ({ data }) => {
  const { statusName, title } = data;
  const todos = useAppSelector(selectAllTodos);

  const hasButton = statusName === "todo";

  if (!statusName) return null;

  return (
    <Droppable droppableId={data.id} type={ITEM_TYPE}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          done={statusName === "done"}
          {...provided.droppableProps}
          {...snapshot}
        >
          <header>
            <h2>{title || "No status"}</h2>
            {hasButton && (
              <button type="button">
                <MdAdd size={24} color="#fff" />
              </button>
            )}
          </header>
          <ul>
            {data.cardIds
              ?.map(id => todos[id])
              .map((todo, cardIndex) =>
                todo ? (
                  <Card key={todo.id} data={todo} index={cardIndex} />
                ) : null,
              )}
            {provided.placeholder}
          </ul>
        </Container>
      )}
    </Droppable>
  );
};

export default List;
