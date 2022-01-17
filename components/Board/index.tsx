import React from "react";
import { DragDropContext, DragStart, DropResult } from "react-beautiful-dnd";

import { useAppDispatch, useAppSelector } from "../../app/hooks";

import {
  selectAllTodoLists,
  selectListsOrder,
  todoDragged,
} from "../../features/todos/todosSlice";
import List from "../List";

import { Container } from "./styles";

const Board: React.FC = () => {
  const lists = useAppSelector(selectAllTodoLists);

  const listsOrder = useAppSelector(selectListsOrder);
  const dispatch = useAppDispatch();

  const onDragStart = (dragStart: DragStart) => {};

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    // check if dropped in area not droppable
    if (!destination) return;

    // check if user is trying to move to same position as origin
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    dispatch(
      todoDragged({
        itemId: draggableId,
        startListId: source.droppableId,
        finishListId: destination.droppableId,
        fromItemIndex: source.index,
        toItemIndex: destination.index,
      }),
    );
  };

  return (
    <Container>
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        {listsOrder.map(listId => {
          const todoList = lists[listId];
          if (!todoList) return null;

          return <List key={todoList.id} data={todoList} />;
        })}
      </DragDropContext>
    </Container>
  );
};

export default Board;
