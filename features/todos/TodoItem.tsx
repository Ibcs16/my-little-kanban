import React, { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectTodoById, Todo, todoUpdated } from "./todosSlice";

interface TodoItemProps extends Todo {}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, status }) => {
  const dispatch = useAppDispatch();
  const [editedTitle, setEditedTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const handleOnChange = (e: { target: HTMLInputElement }) =>
    setEditedTitle(e.target.value);

  const handleSaveEdition = useCallback(() => {
    dispatch(todoUpdated({ id, title: editedTitle, status }));
    setIsEditing(false);
  }, [editedTitle, dispatch, id, status]);

  if (!id) return null;
  return (
    <li onClick={() => setIsEditing(true)}>
      <label>
        {!isEditing && <strong>{title || "Unknow"}</strong>}
        {isEditing && (
          <input
            value={editedTitle}
            onBlur={handleSaveEdition}
            onChange={handleOnChange}
            name={`edit-todo-${id}-input`}
            id={`edit-todo-${id}-input`}
            placeholder="Unknow"
          />
        )}
      </label>
    </li>
  );
};

export default TodoItem;
