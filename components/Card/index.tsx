import React, { useRef } from "react";
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
    type: "CARD",
    item: { type: "CARD", id: data.id, index, listIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: "CARD",
    drop: updateIndexAndStatusOnDrag(
      data,
      index,
      listIndex,
      ref,
      ({ ...cbProps }) => {
        dispatch(todoDragged({ ...cbProps }));
      },
    ),
  });

  dragRef(dropRef(ref));

  return (
    <Container ref={ref} isDragging={isDragging}>
      <strong>{data.title}</strong>
    </Container>
  );
};

export default Card;
