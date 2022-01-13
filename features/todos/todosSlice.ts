import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Todo {
  id: string;
  title: string;
  status: "todo" | "doing" | "done";
}

interface TodoSlice {
  items: Todo[];
}

const initialState: TodoSlice = {
  items: [
    {
      id: "3",
      title: "Ship project",
      status: "todo",
    },
    {
      id: "2",
      title: "Init my-little-kanban",
      status: "doing",
    },
    {
      id: "1",
      title: "Study german",
      status: "done",
    },
  ],
};

const todosSlice = createSlice({
  initialState,
  name: "todos",
  reducers: {
    todoAdded: (state, action) => {},
  },
});

export const { todoAdded } = todosSlice.actions;

export const selectAllTodos = (state: RootState) => state.todos.items;

export const selectTodosByStatus = (state: RootState, status: string) =>
  state.todos.items.filter(todo => status === todo.status);

export default todosSlice.reducer;
