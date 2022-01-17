import { useMotionValue } from "framer-motion";
import React, { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useAppDispatch } from "../../app/hooks";
import { Todo, todoDragged } from "../../features/todos/todosSlice";

import { Container } from "./styles";
import { DragCardItem, updateIndexAndStatusOnDrag } from "./utils/dragNDrop";

interface CardProps {
  data: Todo;
  index: number;
  listIndex: number;
}

const Card: React.FC<CardProps> = ({ data, index, listIndex }) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: ITEM_TYPE,
    item: { type: ITEM_TYPE, ...data, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, dropRef] = useDrop({
    accept: ITEM_TYPE,
    hover: (item: Todo, monitor) => {
      if (!ref.current) {
        return;
      }

      // get comparing indexes
      const draggedIndex = item.index;
      const targetIndex = index;

      // if is hovering over same item that is being dragged, do nothing
      if (draggedIndex === targetIndex) return;

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

      dispatch(todoDragged({ draggedIndex, targetIndex }));
      item.index = targetIndex;
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  });

  dragRef(dropRef(ref));

  return (
    <Container
      ref={ref}
      initial={false}
      isDragging={isDragging}
      whileHover={{ scale: 1.03 }}
    >
      <strong>{data.title}</strong>
    </Container>
  );
};

// Spring configs
export default Card;

export const ITEM_TYPE = "CARD";
