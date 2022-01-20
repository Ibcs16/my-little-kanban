// ts-ignore
import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import todosReducer, { TodoSlice } from "../features/todos/todosSlice";
import { AppStore, RootState } from "../app/store";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../styles/theme";
// Import your own reducer

export const mockedTodos = {
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
    status: "done",
  },
  "1": {
    id: "1",
    title: "Init project",
    status: "done",
  },
};

export const mockedTodoLists = {
  "1": {
    id: "1",
    title: "To do 💭",
    statusName: "todo",
    cardIds: ["2"],
    order: "0",
  },
  "2": {
    id: "2",
    title: "Doing 🔥",
    statusName: "doing",
    cardIds: ["3"],
    order: "1",
  },
  "3": {
    id: "3",
    title: "Done ✅",
    statusName: "done",
    cardIds: ["1", "4"],
    order: "2",
  },
};

export const mockedTodosListsOrder = ["1", "2", "3"];

function render(
  ui: React.ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer: { todos: todosReducer },
      preloadedState: {
        todos: {
          items: {},
          lists: mockedTodoLists,
          listsOrder: mockedTodosListsOrder,
          filterStatus: [],
          search: "",
          loadTodosApiStatus: "",
          editTodoApiStatus: "",
          createTodoApiStatus: "",
        } as TodoSlice,
      },
    }),
    ...renderOptions
  } = {} as { preloadedState: RootState; store: AppStore },
) {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
