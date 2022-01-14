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
];

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: { todos: todosReducer },
      preloadedState: {
        todos: {
          items: mockedTodos,
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
