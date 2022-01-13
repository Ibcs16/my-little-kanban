import { createSlice, nanoid } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Todo {
  id: string;
  title: string;
  status: "todo" | "doing" | "done";
}

interface TodoSlice {
  items: Todo[];
  search: string;
  filterStatus: string[];
}

const initialState: TodoSlice = {
  items: [],
  search: "",
  filterStatus: [],
};

const todosSlice = createSlice({
  initialState,
  name: "todos",
  reducers: {
    todoAdded: (state, action) => {
      state.items.push(action.payload);
    },
    searchedTerm: (state, action) => {
      state.search = action.payload;
    },
    filterStatusChanged: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});

export const { todoAdded, searchedTerm, filterStatusChanged } =
  todosSlice.actions;

export const selectAllTodos = (state: RootState) => {
  const { items, search, filterStatus } = state.todos;
  return items.filter(
    ({ title, status }) =>
      title.includes(search) || filterStatus.includes(status),
  );
};

export const selectTodosByStatus = (state: RootState, status: string) => {
  const { items, search, filterStatus } = state.todos;
  return items
    .filter(todo => todo.status === status)
    .filter(
      ({ title, status }) =>
        title.includes(search) || filterStatus.includes(status),
    );
};

export default todosSlice.reducer;
