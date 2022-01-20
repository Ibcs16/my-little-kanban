import { act, screen, waitFor } from "@testing-library/react";
import Home from "../pages/index";
import { render, within } from "../utils/test-utils";
import userEvent from "@testing-library/user-event";

import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";

// We use msw to intercept the network request during the test,
// and return the response after 150ms
// when receiving a get request to the `/lists` endpoint
export const handlers = [
  rest.get("https://my-little-kanban.herokuapp.com/lists", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          title: "fake-list",
          id: "1",
          statusName: "fake-list",
          cardIds: ["1"],
          order: "0",
        },
        {
          title: "fake-list-2",
          id: "2",
          statusName: "fake-list-2",
          cardIds: ["2"],
          order: "1",
        },
        {
          title: "fake-list-3",
          id: "3",
          statusName: "fake-list-3",
          cardIds: ["3"],
          order: "2",
        },
      ]),
      ctx.delay(150),
    );
  }),
  rest.get("https://my-little-kanban.herokuapp.com/todos", (req, res, ctx) => {
    return res(
      ctx.json([
        { title: "fake-todo", id: "1", status: "fake-list" },
        { title: "fake-todo-2", id: "2", status: "fake-list-2" },
        { title: "fake-todo-3", id: "3", status: "fake-list-3" },
      ]),
      ctx.delay(150),
    );
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe("Home", () => {
  it("show board after loading spinner", async () => {
    render(<Home />);

    // loader
    await waitFor(() =>
      expect(screen.getByTestId("spinner")).toBeInTheDocument(),
    );
    expect(screen.queryByTestId("board")).not.toBeInTheDocument();
    // finished fetching data
    await waitFor(() =>
      expect(screen.getByTestId("board")).toBeInTheDocument(),
    );
  });

  describe("when user searches for term", () => {
    it("should only show items matching the text", async () => {
      render(<Home />);

      // check for initial todos
      await waitFor(() =>
        expect(screen.getByTestId("board")).toBeInTheDocument(),
      );

      const lists = screen.getAllByTestId("list");
      const todos = screen.getAllByTestId("task");

      expect(lists).toHaveLength(3);
      expect(todos).toHaveLength(3);

      // // search for todo with text "Init"
      const searchbox = screen.getByTestId("search-box");
      await act(() => userEvent.type(searchbox, "fake-todo-2"));

      // // check if list has decreased to one matching item
      await waitFor(() =>
        expect(screen.getAllByTestId("task")).toHaveLength(1),
      );

      // // check if remaining item is indeed the one we searched for
      const [remainingTodo] = screen.getAllByTestId("task");
      expect(remainingTodo).toHaveTextContent("fake-todo-2");
    });
  });
  describe("when user check filter boxes", () => {
    it("should only show items matching the filtered status", async () => {
      render(<Home />);

      // check for initial todos
      await waitFor(() =>
        expect(screen.getAllByTestId("task")).toHaveLength(3),
      );

      const [dropdown] = await openDropDown();
      // select todoCheckbox
      const [todoCheckbox] = within(dropdown).getAllByRole("checkbox");
      await act(() => userEvent.click(todoCheckbox));

      // check if list has decreased to one matching item
      await waitFor(() =>
        expect(screen.getAllByTestId("task")).toHaveLength(1),
      );

      // check if remaining item is indeed the one we filtered for
      const [remainingTodo] = screen.getAllByTestId("task");
      expect(remainingTodo).toHaveTextContent("fake-todo");
    });
  });
});

async function openDropDown(): Promise<HTMLElement[]> {
  const toggleFilterButton = screen.getByTestId("filter-toggle-button");
  await act(() => userEvent.click(toggleFilterButton));
  await waitFor(() => expect(screen.queryByRole("dialog")).toBeInTheDocument());
  const dropDownElement = screen.getByRole("dialog");
  const closeDropDownButton = screen.getByTestId(
    "filter-dropdown-close-button",
  );
  const portal = screen.getByTestId("portal");
  return [dropDownElement, closeDropDownButton, toggleFilterButton, portal];
}
