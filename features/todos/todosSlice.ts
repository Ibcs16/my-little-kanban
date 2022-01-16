import { createSlice, nanoid } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { mockedTodos } from "../../utils/test-utils";

export interface Todo {
  id: string;
  title: string;
  status: string;
  index: number;
}

export interface TodoList {
  id: string;
  title: string;
  statusName: string;
  cards: Todo[];
}

interface TodoSlice {
  lists: TodoList[];
  search: string;
  filterStatus: string[];
}

const initialState: TodoSlice = {
  lists: mockedTodos,
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
      state.lists.push(action.payload);
    },
    todoUpdated: (state, action) => {
      const { title, status, id } = action.payload as Todo;
      const oldTodo = selectTodoById({ todos: state }, id);
      if (!oldTodo) return;
      oldTodo.status = status;
      oldTodo.title = title;
    },
    todoDragged: (state, action) => {
      const { fromIndex, toIndex, fromListIndex, toListIndex } =
        action.payload as TodoDraggedActionPayload;

      const oldTodo = state.lists[fromListIndex].cards[fromIndex];

      if (!oldTodo) return;

      oldTodo.index = toIndex;
      oldTodo.status = state.lists[toListIndex].statusName;

      state.lists[fromListIndex].cards.splice(fromIndex, 1);
      state.lists[toListIndex].cards.splice(toIndex, 0, oldTodo);

      state.lists[fromListIndex].cards.forEach(
        (todo, index) => (todo.index = index),
      );
      state.lists[toListIndex].cards.forEach(
        (todo, index) => (todo.index = index),
      );
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
} = todosSlice.actions;

export const selectAllTodoLists = (state: RootState) => state.todos.lists;

export const selectAllFilterStatus = (state: RootState) =>
  state.todos.filterStatus;

export const selectTodoById = (state: RootState, id: string) =>
  state.todos.lists
    .reduce((acc, current) => [...acc, ...current.cards], [] as Todo[])
    .find(todo => todo.id === id);

export const selectTodosByStatus = (state: RootState, status: string) => {
  let { lists, search, filterStatus } = state.todos;

  const list = lists.find(todoList => todoList.statusName === status) || {
    cards: [] as Todo[],
  };

  let todos = list.cards;

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
