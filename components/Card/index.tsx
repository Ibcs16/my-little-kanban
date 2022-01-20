import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { Todo } from "../../features/todos/models/todo";
import {
  deleteTodo,
  selectEditTodoApiStatus,
} from "../../features/todos/todosSlice";
import Actions from "./components/Actions";

import { Container } from "./styles";

interface CardProps {
  data: Todo;
  index: number;
}

const Card: React.FC<CardProps> = ({ data, index }) => {
  const dispatch = useAppDispatch();
  const editApiStatus = useAppSelector(selectEditTodoApiStatus);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {};

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${data.title}"?`)) {
      setIsEditing(true);
      dispatch(deleteTodo(data));
      setTimeout(() => {
        setIsEditing(false);
      }, 800);
    }
  };
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          {...snapshot}
        >
          <div className="content">
            <strong>{data.title}</strong>
          </div>
          <Actions
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={isEditing && editApiStatus === "loading"}
          />
        </Container>
      )}
    </Draggable>
  );
};

// Spring configs
export default Card;

export const ITEM_TYPE = "CARD";
