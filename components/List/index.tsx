import { MdAdd } from "react-icons/md";
import Card, { ITEM_TYPE } from "../Card";

import { Container } from "./styles";

import React, { useMemo, useRef } from "react";
import { useAppSelector } from "../../app/hooks";
import {
  selectAllTodoLists,
  selectTodosByStatus,
  Todo,
  TodoList,
} from "../../features/todos/todosSlice";
import { DropTargetMonitor, useDrop } from "react-dnd";

interface TodoListProps {
  data: TodoList;
  index: number;
  onDrop: (
    item: Todo,
    monitor: DropTargetMonitor,
    listStatusName: string,
  ) => void;
}

const List: React.FC<TodoListProps> = ({ onDrop, data, index }) => {
  const { statusName, title } = data;
  const todos = useAppSelector(state => selectTodosByStatus(state, statusName));
  const lists = useAppSelector(selectAllTodoLists);

  const hasButton = statusName === "todo";

  const ref = useRef<HTMLDivElement>(null);

  const [{ cardIsOver }, dropRef] = useDrop({
    accept: ITEM_TYPE,
    canDrop: (item: Todo, _) => {
      // find index of item
      const itemStatusIndex = lists.findIndex(
        li => li.statusName === item.status,
      );
      // item cant move back more than 1 step
      return [itemStatusIndex + 1, itemStatusIndex - 1].includes(index);
    },
    drop: (item, monitor) => {
      onDrop(item, monitor, data.statusName);
    },
    collect: monitor => ({
      cardIsOver: monitor.isOver(),
    }),
  });

  dropRef(ref);

  if (!statusName) return null;

  return (
    <Container ref={ref} done={statusName === "done"} cardIsOver={cardIsOver}>
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
