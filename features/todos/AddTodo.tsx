import { nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { todoAdded } from "./todosSlice";

interface AddTodoProps {
  status: "todo" | "doing" | "done" | string;
}

const AddTodo: React.FC<AddTodoProps> = ({ status }) => {
  const [title, setTitle] = useState("");
  const dispatch = useAppDispatch();

  const handleAddNewTodo = () => {
    if (!title) return;
    dispatch(todoAdded({ id: nanoid(), title, status }));
    setTitle("");
  };

  const onTitleChange = e => setTitle(e.target?.value);

  return (
    <div>
      <input
        type="text"
        name={`${status}-add`}
        id={`${status}-add-input`}
        onChange={onTitleChange}
        value={title}
      />
      <button id={`${status}-add-button`} onClick={handleAddNewTodo}>
        Add new Todo
      </button>
    </div>
  );
};

export default AddTodo;
