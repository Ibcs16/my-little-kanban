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
  index?: number;
}

export interface TodoList {
  id: string;
  title: string;
  statusName: string;
  cardIds: string[];
}

interface TodoSlice {
  items: {
    [id: string]: Todo;
  };
  lists: {
    [id: string]: TodoList;
  };
  search: string;
  filterStatus: string[];
  listsOrder: string[];
}

const initialState: TodoSlice = {
  items: {
    "2": {
      id: "2",
      title: "Finish project",
      status: "todo",
    },
    "3": {
      id: "3",
      title: "Develop project",
      status: "doing",
    },
    "4": {
      id: "4",
      title: "Design layout",
      status: "doing",
    },
    "1": {
      id: "1",
      title: "Init project",
      status: "done",
    },
  },
  lists: {
    "1": {
      id: "1",
      title: "To do 💭",
      statusName: "todo",
      cardIds: ["2"],
    },
    "2": {
      id: "2",
      title: "Doing 🔥",
      statusName: "doing",
      cardIds: ["3"],
    },
    "3": {
      id: "3",
      title: "Done ✅",
      statusName: "done",
      cardIds: ["1", "4"],
    },
  },
  listsOrder: ["1", "2", "3"],
  search: "",
  filterStatus: [],
};

const todosSlice = createSlice({
  initialState,
  name: "todos",
  reducers: {
    todoAdded: (state, action) => {
      const { id } = action.payload;
      state.items[id] = action.payload;
    },
    todoUpdated: (state, action) => {
      const { title, status, id } = action.payload as Todo;
      const oldTodo = selectTodoById({ todos: state }, id);
      if (!oldTodo) return;
      oldTodo.status = status;
      oldTodo.title = title;
    },
    todoDragged: (state, action) => {
      const { startListId, finishListId, itemId, fromItemIndex, toItemIndex } =
        action.payload;

      // get list source and destination
      const startList = state.lists[startListId];
      const finishList = state.lists[finishListId];

      // check if user is dragging within same list
      if (startList === finishList) {
        // update cardIds
        const newTodoIds = Array.from(startList.cardIds);
        newTodoIds.splice(fromItemIndex, 1);
        newTodoIds.splice(toItemIndex, 0, itemId);

        const newList = {
          ...startList,
          cardIds: newTodoIds,
        };

        // update list with updated items
        state.lists[startListId] = newList;
        return;
      }

      // User is moving between lists

      // remove card from source list
      const startCardIds = Array.from(startList.cardIds);
      startCardIds.splice(fromItemIndex, 1);
      const newStartList = {
        ...startList,
        cardIds: startCardIds,
      };

      // add it to the destination list
      const finishCardIds = Array.from(finishList.cardIds);
      finishCardIds.splice(toItemIndex, 0, itemId);
      const newFinishList = {
        ...finishList,
        cardIds: finishCardIds,
      };

      // upload lists
      state.lists[startListId] = newStartList;
      state.lists[finishListId] = newFinishList;
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

export const selectAllTodos = (state: RootState) => state.todos.items;

export const selectAllFilterStatus = (state: RootState) =>
  state.todos.filterStatus;

export const selectTodoById = (state: RootState, id: string) =>
  state.todos.items[id];

export const selectTodosByStatus = (state: RootState, status: string) => {
  let { items, search, filterStatus } = state.todos;

  let todos = Object.values(items).filter(todo => todo.status === status);

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

export const selectTodosByIds = (state: RootState, ids: string[]) => {
  let { items, search, filterStatus } = state.todos;

  let todos = Object.values(items).filter(todo => ids.includes(todo.id));

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

export const selectListsOrder = (state: RootState) => state.todos.listsOrder;

export default todosSlice.reducer;
