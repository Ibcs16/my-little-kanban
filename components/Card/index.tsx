import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Todo } from "../../features/todos/todosSlice";

import { Container } from "./styles";

interface CardProps {
  data: Todo;
}

const Card: React.FC<CardProps> = ({ data }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "CARD",
    item: { type: "CARD", ...data },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: "CARD",
    hover(item: Todo, monitor) {
      // item is the one being dropped
      // monitor gives extra info like
      console.log(item.id);
    },
  });

  return (
    <Container ref={dragRef} isDragging={isDragging}>
      <strong>{data.title}</strong>
    </Container>
  );
};

export default Card;
