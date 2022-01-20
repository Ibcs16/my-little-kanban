import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../app/store";
import Service, {
  AddTodoRequest,
  UpdateListRequest,
  UpdateListResponse,
} from "../../services/todos";
import {
  mockedTodoLists,
  mockedTodos,
  mockedTodosListsOrder,
} from "../../utils/test-utils";
import { Todo, TodoList } from "./models/todo";

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

interface TodoSliceItems {
  [id: string]: Todo;
}

interface TodoSliceLists {
  [id: string]: TodoList;
}

export interface TodoSlice {
  items: TodoSliceItems;
  lists: TodoSliceLists;
  search: string;
  filterStatus: string[];
  listsOrder: string[];
  loadTodosApiStatus: string;
  createTodoApiStatus: string;
  editTodoApiStatus: string;
}

const initialState: TodoSlice = {
  items: {},
  lists: {},
  listsOrder: [],
  search: "",
  filterStatus: [],
  loadTodosApiStatus: "",
  createTodoApiStatus: "",
  editTodoApiStatus: "",
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const data = await Service.fetchTodos();
  return data;
});

export const deleteTodo = createAsyncThunk<
  // Return type of the payload creator
  Todo,
  // First argument to the payload creator
  Todo,
  {
    // Optional fields for defining thunkApi field types
    dispatch: AppDispatch;
    state: RootState;
  }
>("todos/deleteTodo", async (todo: Todo) => {
  await Service.deleteTodo(todo.id);
  return todo;
});

export const addTodo = createAsyncThunk<
  // Return type of the payload creator
  Todo,
  // First argument to the payload creator
  AddTodoRequest,
  {
    // Optional fields for defining thunkApi field types
    dispatch: AppDispatch;
    state: RootState;
  }
>("todos/addTodo", async (newTodo: AddTodoRequest) => {
  const data = await Service.createTodo(newTodo);
  return data;
});

export const editTodo = createAsyncThunk<
  // Return type of the payload creator
  Todo,
  // First argument to the payload creator
  Todo,
  {
    // Optional fields for defining thunkApi field types
    dispatch: AppDispatch;
    state: RootState;
  }
>("todos/editTodo", async (updatedTodo: Todo) => {
  const data = await Service.updateTodo(updatedTodo);
  return data;
});

export const updateList = createAsyncThunk<
  // Return type of the payload creator
  UpdateListResponse,
  // First argument to the payload creator
  UpdateListRequest,
  {
    // Optional fields for defining thunkApi field types
    dispatch: AppDispatch;
    state: RootState;
  }
>("lists/updateList", async payload => {
  const {
    startListId,
    finishListId,
    itemId,
    fromItemIndex,
    toItemIndex,
    state,
  } = payload;

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
    const data = await Service.updateList(newList);
    return data;
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
  const data = await Service.updateLists(newStartList, newFinishList);
  console.log("fim");
  return data;
});

const todosSlice = createSlice({
  initialState,
  name: "todos",
  reducers: {
    todoUpdated: (state, action) => {
      const { title, status, id } = action.payload as Todo;
      const oldTodo = selectTodoById({ todos: state }, id);
      if (!oldTodo) return;
      oldTodo.status = status;
      oldTodo.title = title;
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
  extraReducers: builder => {
    builder
      .addCase(addTodo.pending, (state, action) => {
        state.createTodoApiStatus = "loading";
      })
      .addCase(editTodo.pending, (state, action) => {
        state.editTodoApiStatus = "loading";
        const { title, status, id } = action.meta.arg;
        const oldTodo = selectTodoById({ todos: state }, id);
        if (!oldTodo) return;
        oldTodo.status = status;
        oldTodo.title = title;
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        state.editTodoApiStatus = "idle";
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.createTodoApiStatus = "error";
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        state.items[id] = action.payload;
        const list = Object.values(state.lists).find(
          list => list.statusName === status,
        );
        if (list) {
          state.lists[list.id].cardIds =
            state.lists[list.id].cardIds.concat(id);
        }
        state.createTodoApiStatus = "idle";
      })
      .addCase(fetchTodos.pending, (state, action) => {
        state.loadTodosApiStatus = "loading";
      })
      .addCase(deleteTodo.pending, (state, action) => {
        state.editTodoApiStatus = "loading";
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        delete state.items[id];
        const list = Object.values(state.lists).find(
          list => list.statusName === status,
        );
        if (list) {
          const itemIndex = list.cardIds.findIndex(findId => findId === id);
          state.lists[list.id].cardIds.splice(itemIndex, 1);
        }
        state.editTodoApiStatus = "idle";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.lists = action.payload.lists;
        state.loadTodosApiStatus = "idle";
      })
      .addCase(updateList.pending, (state, action) => {
        const {
          startListId,
          finishListId,
          itemId,
          fromItemIndex,
          toItemIndex,
        } = action.meta.arg;
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
      })
      .addCase(updateList.fulfilled, (state, action) => {});
  },
});

export const {
  searchedTerm,
  checkedFilterStatus,
  uncheckedFilterStatus,
  todoUpdated,
} = todosSlice.actions;

export const selectAllTodoLists = (state: RootState) => state.todos.lists;

export const selectAllTodos = (state: RootState) => {
  const { items, filterStatus, search } = state.todos;

  let todos = Object.values(items);

  if (filterStatus.length) {
    // check lists that are in the filter
    const lists = Object.values(state.todos.lists).filter(li =>
      filterStatus.includes(li.statusName),
    );
    const cardIds = lists
      .map(({ cardIds }) => cardIds)
      .reduce((acc, curr) => [...acc, ...curr], []);

    todos = todos.filter(todo => cardIds.includes(todo.id));
  }

  if (search) {
    todos = todos.filter(todo =>
      todo.title.toLowerCase().includes(search.toLowerCase()),
    );
  }
  return todos
    .map(todo => ({ [todo.id]: todo }))
    .reduce((arr, curr) => ({ ...arr, ...curr }), {});
};

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

export const selectLoadTodosApiStatus = (state: RootState) =>
  state.todos.loadTodosApiStatus;

export const selectCreateTodoApiStatus = (state: RootState) =>
  state.todos.createTodoApiStatus;

export const selectEditTodoApiStatus = (state: RootState) =>
  state.todos.editTodoApiStatus;

export default todosSlice.reducer;
