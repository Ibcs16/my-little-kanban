import React from "react";
import { Todo } from "../../features/todos/todosSlice";

import { Container } from "./styles";

interface CardProps {
  data: Todo;
}

const Card: React.FC<CardProps> = ({ data }) => {
  return (
    <Container>
      <strong>{data.title}</strong>
    </Container>
  );
};

export default Card;
