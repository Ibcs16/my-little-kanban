import React from "react";
import { DropTargetMonitor } from "react-dnd";
import { Todo } from "../../../features/todos/todosSlice";

export interface DragCardItem {
  type: "CARD";
  id: string;
  index: number;
  listIndex: number;
}

export interface DragCallbackProps {
  fromListIndex: number;
  fromIndex: number;
  toListIndex: number;
  toIndex: number;
}

export const updateIndexAndStatusOnDrag =
  (
    data: Todo,
    targetIndex: number,
    targetListIndex: number,
    ref: React.RefObject<HTMLDivElement>,
    cb: (cbProps: DragCallbackProps) => void,
  ) =>
  (item: DragCardItem, monitor: DropTargetMonitor) => {
    // item is the one being dropped
    // monitor gives extra info like
    const draggedIndex = item.index;
    const draggedListIndex = item.listIndex;

    // if (draggedIndex === targetIndex && targetStatus === draggedStatus) {
    //   return;
    // }

    // gets size of card
    const targetSize = ref?.current?.getBoundingClientRect();
    if (!targetSize) return;

    // calculate its center
    const targetCenter = (targetSize?.bottom - targetSize?.top) / 2;

    // get how much a card has been dragged
    const draggedOffset = monitor.getClientOffset();
    if (!draggedOffset) return;

    // get how much has been dragged from top
    const draggedTop = draggedOffset.y - targetSize.top;

    // if card is in same list and trying to be in the same position, do nothing
    if (
      // from top
      (draggedIndex < targetIndex && draggedTop < targetCenter) ||
      // or bottom
      (draggedIndex > targetIndex && draggedTop > targetCenter)
    ) {
      return;
    }

    // update item

    // console.log(item);

    // callback with updated item and old index
    cb({
      fromIndex: item.index,
      fromListIndex: item.listIndex,
      toIndex: targetIndex,
      toListIndex: targetListIndex,
    });

    item.index = targetIndex;
    item.listIndex = targetListIndex;
  };
