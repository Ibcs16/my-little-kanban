// ts-ignore
import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import todosReducer from "../features/todos/todosSlice";
// Import your own reducer

export const mockedTodos = [
  {
    id: "3",
    title: "Deploy project",
    index: 0,
    status: "todo",
  },
  {
    id: "4",
    title: "Send for review",
    index: 1,
    status: "todo",
  },
  {
    id: "1",
    title: "Develop features",
    index: 0,
    status: "doing",
  },

  {
    id: "2",
    title: "Init project",
    index: 0,
    status: "done",
  },
];

export const mockedTodoLists = [
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

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: { todos: todosReducer },
      preloadedState: {
        todos: {
          lists: mockedTodos,
          filterStatus: [],
          search: "",
        },
      },
    }),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
