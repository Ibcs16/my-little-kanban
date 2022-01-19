import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";

import { render, screen } from "../../utils/test-utils";
import Home from "../../pages/index";

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
      ]),
      ctx.delay(150),
    );
  }),
  rest.get("https://my-little-kanban.herokuapp.com/todos", (req, res, ctx) => {
    return res(
      ctx.json([{ title: "fake-todo", id: "1", status: "fake-list" }]),
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

test("fetch lists and items after rendering", async () => {
  render(<Home />);

  // should show on first load
  expect(screen.queryAllByText(/fake-list/i)).toHaveLength(0);
  expect(screen.queryByText(/fake-todo/i)).not.toBeInTheDocument();
  // should show list in filters and board after fetching
  expect(await screen.findAllByText(/fake-list/i)).toHaveLength(2);
  expect(await screen.findByText(/fake-todo/i)).toBeInTheDocument();
});
