import React from "react";
import { Draggable } from "react-beautiful-dnd";

import { Todo } from "../../features/todos/todosSlice";

import { Container } from "./styles";

interface CardProps {
  data: Todo;
  index: number;
}

const Card: React.FC<CardProps> = ({ data, index }) => {
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          {...snapshot}
        >
          <strong>{data.title}</strong>
        </Container>
      )}
    </Draggable>
  );
};

// Spring configs
export default Card;

export const ITEM_TYPE = "CARD";
