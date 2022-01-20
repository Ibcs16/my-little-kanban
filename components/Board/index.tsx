import React, { useCallback } from "react";
import { DragDropContext, DragStart, DropResult } from "react-beautiful-dnd";

import { useAppDispatch, useAppSelector } from "../../app/hooks";

import {
  selectAllTodoLists,
  updateList,
} from "../../features/todos/todosSlice";
import List from "../List";

import { Container } from "./styles";

const Board: React.FC = () => {
  const lists = useAppSelector(selectAllTodoLists);

  const dispatch = useAppDispatch();

  const onDragStart = (dragStart: DragStart) => {};

  const onDragEnd = useCallback(
    (result: DropResult) => {
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
        updateList({
          itemId: draggableId,
          startListId: source.droppableId,
          finishListId: destination.droppableId,
          fromItemIndex: source.index,
          toItemIndex: destination.index,
          state: {
            lists,
          },
        }),
      );
    },
    [lists, dispatch],
  );

  return (
    <Container data-testid="board">
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        {Object.values(lists)
          .sort((a, b) => Number(a.order) - Number(b.order))
          .map(todoList => (
            <List key={todoList.id} data={todoList} />
          ))}
      </DragDropContext>
    </Container>
  );
};

export default Board;
