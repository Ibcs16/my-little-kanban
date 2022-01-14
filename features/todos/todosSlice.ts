import { createSlice, nanoid } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Todo {
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
    checkedFilterStatus: (state, action) => {
      state.filterStatus.push(action.payload);
    },
    uncheckedFilterStatus: (state, action) => {
      state.filterStatus = state.filterStatus.filter(
        status => status !== action.payload,
      );
    },
  },
});

export const {
  todoAdded,
  searchedTerm,
  checkedFilterStatus,
  uncheckedFilterStatus,
} = todosSlice.actions;

export const selectAllTodos = (state: RootState) => {
  let { items, search, filterStatus } = state.todos;
  if (filterStatus.length) {
    items = items.filter(todo => filterStatus.includes(status));
  }

  if (search) {
    items = items.filter(todo => todo.title.includes(search));
  }

  return items;
};

export const selectAllFilterStatus = (state: RootState) =>
  state.todos.filterStatus;

export const selectTodoById = (state: RootState, id: string) =>
  state.todos.items.find(todo => todo.id === id);

export const selectTodosByStatus = (state: RootState, status: string) => {
  let { items, search, filterStatus } = state.todos;

  items = items.filter(todo => todo.status === status);

  if (filterStatus.length) {
    items = items.filter(todo => filterStatus.includes(status));
  }

  if (search) {
    items = items.filter(todo => todo.title.includes(search));
  }

  return items;
};

export default todosSlice.reducer;
