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
  items: [],
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
