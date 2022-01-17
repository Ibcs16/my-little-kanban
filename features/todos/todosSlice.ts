import { createSlice, nanoid } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { mockedTodoLists, mockedTodos } from "../../utils/test-utils";

export const todoLists = [
  {
    id: "1",
    title: "Todo 💭",
    statusName: "todo",
  },
  {
    id: "2",
    title: "Doing 🔥",
    statusName: "doing",
  },
  {
    id: "3",
    title: "Done ✅",
    statusName: "done",
  },
];

export interface Todo {
  id: string;
  title: string;
  status: string;
  index: number;
}

export interface TodoStatus {
  id: string;
  title: string;
  statusName: string;
}

interface TodoSlice {
  items: Todo[];
  statuses: TodoStatus[];
  search: string;
  filterStatus: string[];
}

const initialState: TodoSlice = {
  items: mockedTodos,
  statuses: todoLists,
  search: "",
  filterStatus: [],
};

interface TodoDraggedActionPayload {
  todoId: string;
  fromIndex: number;
  toIndex: number;
  fromListIndex: number;
  toListIndex: number;
}

const todosSlice = createSlice({
  initialState,
  name: "todos",
  reducers: {
    todoAdded: (state, action) => {
      state.items.push(action.payload);
    },
    todoUpdated: (state, action) => {
      const { title, status, id } = action.payload as Todo;
      const oldTodo = selectTodoById({ todos: state }, id);
      if (!oldTodo) return;
      oldTodo.status = status;
      oldTodo.title = title;
    },
    todoDragged: (state, action) => {
      const { draggedIndex, targetIndex } = action.payload;
      const todo = state.items[draggedIndex];
      state.items = state.items.filter((_, index) => index !== draggedIndex);
      state.items.splice(targetIndex, 0, todo);
    },
    todoStatusChanged: (state, action) => {
      const { status, todo } = action.payload;
      state.items = state.items
        .filter(td => td.id !== todo.id)
        .concat({ ...todo, status });
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
  todoUpdated,
  todoDragged,
  todoStatusChanged,
} = todosSlice.actions;

export const selectAllTodoLists = (state: RootState) => state.todos.statuses;

export const selectAllFilterStatus = (state: RootState) =>
  state.todos.filterStatus;

export const selectTodoById = (state: RootState, id: string) =>
  state.todos.items.find(todo => todo.id === id);

export const selectTodosByStatus = (state: RootState, status: string) => {
  let { items, search, filterStatus } = state.todos;

  let todos = items.filter(todoList => todoList.status === status);

  if (filterStatus.length) {
    todos = todos.filter(todo => filterStatus.includes(todo.status));
  }

  if (search) {
    todos = todos.filter(todo =>
      todo.title.toLowerCase().includes(search.toLowerCase()),
    );
  }

  return todos;
};

export default todosSlice.reducer;
