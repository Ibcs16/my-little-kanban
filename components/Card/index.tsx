import { useCycle } from "framer-motion";
import React, { useCallback, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { Todo } from "../../features/todos/models/todo";
import {
  deleteTodo,
  editTodo,
  selectEditTodoApiStatus,
} from "../../features/todos/todosSlice";
import Actions from "./components/Actions";

import { Container, TitleEditInput } from "./styles";

interface CardProps {
  data: Todo;
  index: number;
}

const Card: React.FC<CardProps> = ({ data, index }) => {
  const dispatch = useAppDispatch();
  const editApiStatus = useAppSelector(selectEditTodoApiStatus);
  const [isEditing, setIsEditing] = useCycle(false, true);
  const [newText, setNewText] = useState(data.title);
  const editInputRef = useRef<HTMLInputElement>(null);

  const toggleIsEditing = () => setIsEditing();

  const handleEdit = () => {
    if (!newText) {
      setNewText(data.title);
      return;
    }
    dispatch(editTodo({ ...data, title: newText }));

    setTimeout(() => {
      toggleIsEditing();
    }, 800);
  };

  const handleOpenEdit = () => {
    toggleIsEditing();
    if (editInputRef.current) {
      editInputRef.current.focus();
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${data.title}"?`)) {
      toggleIsEditing();
      dispatch(deleteTodo(data));
      setTimeout(() => {
        toggleIsEditing();
      }, 800);
    }
  };

  const onTextChange = (e: { target: HTMLInputElement }) => {
    setNewText(e.target.value);
  };

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          {...snapshot}
          isLoading={isEditing ? editApiStatus === "loading" : false}
          role="listitem"
          tabIndex={1}
          data-testid={`task`}
        >
          <div className="content">
            {!isEditing && <strong>{newText || data.title}</strong>}
            {/* {isEditing && ( */}
            {/* <TitleEditInput
              name={`card-${data.id}-input`}
              onChange={onTextChange}
              value={newText}
              onBlur={handleEdit}
              ref={editInputRef}
              placeholder="Unknown"
              // readOnly={!isEditing}
              tabIndex={isEditing ? 0 : -1}
              // disabled={!isEditing}
              // show={isEditing}
            /> */}
            {/* )} */}
          </div>
          <Actions
            onOpenEdit={handleOpenEdit}
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
