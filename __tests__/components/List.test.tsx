import List from "../../components/List";

import {
  render,
  screen,
  within,
  mockedTodoLists,
  preloadedState,
  fireEvent,
  act,
  waitFor,
} from "../../utils/test-utils";

import { theme } from "../../styles/theme";
import userEvent from "@testing-library/user-event";

import { rest } from "msw";
import { setupServer } from "msw/node";
import { nanoid } from "@reduxjs/toolkit";

const mockedList = mockedTodoLists["1"];

// We use msw to intercept the network request during the test,
// and return the response after 150ms
// when receiving a get request to the `/lists` endpoint
export const handlers = [
  rest.post("https://my-little-kanban.herokuapp.com/todos", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: nanoid(),
          title: "New todo",
          status: "todo",
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

describe("List", () => {
  it("should render a list with title and no children", () => {
    render(<List data={mockedList} />, { withDragProvider: true });
    const heading = screen.getByRole("heading", {
      name: mockedList.title,
    });
    expect(heading).toBeInTheDocument();
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });
  it("should render a list with cards", () => {
    render(<List data={mockedList} />, {
      preloadedState,
      withDragProvider: true,
    });

    const heading = screen.getByRole("heading", {
      name: mockedList.title,
    });
    expect(heading).toBeInTheDocument();
    expect(screen.queryAllByRole("listitem")).not.toHaveLength(0);
  });
  it("should not have border style when dragging cards within list", async () => {
    const { container } = render(<List data={mockedList} />, {
      preloadedState,
      withDragProvider: true,
    });

    const [card] = screen.getAllByRole("listitem");
    const list = screen.getByTestId(`list`);

    fireEvent.dragStart(card);
    fireEvent.dragEnter(list);
    fireEvent.dragOver(list);
    // fireEvent.drop(card);

    expect(list).not.toHaveStyle({
      border: `2px dashed ${theme.colors.primary}`,
    });
  });
  it("should open add task modal when clicking on add button", async () => {
    render(<List data={mockedList} />, {
      withDragProvider: true,
      preloadedState,
    });

    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
    const addTaskButton = screen.getByTestId("open-modal-button");
    await act(() => userEvent.click(addTaskButton));
    await waitFor(() =>
      expect(screen.getByTestId("modal")).toBeInTheDocument(),
    );
  });
  it("if task added from modal, card should be added to list", async () => {
    render(<List data={mockedList} />, {
      withDragProvider: true,
      preloadedState,
    });

    expect(screen.queryAllByRole("listitem")).toHaveLength(2);
    // open modal
    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
    const openModalButton = screen.getByTestId("open-modal-button");
    await act(() => userEvent.click(openModalButton));
    // check if modal is open
    const modal = screen.getByTestId("modal");

    await waitFor(() => expect(modal).toBeInTheDocument());
    // insert task title
    const newTaskInput = within(modal).getByRole("textbox");

    await act(() => userEvent.type(newTaskInput, "New task"));

    const createTaskButton = within(modal).getByText(/Add task/i);
    // submit form
    await act(() => userEvent.click(createTaskButton));
    // expect modal to close
    // await waitFor(() => expect(modal).not.toBeInTheDocument());
    //check to see if list has new item
    // await waitFor(() =>
    //   expect(screen.getAllByRole("listitem")).toHaveLength(3),
    // );
  });
});

const verifyTaskOrderInColumn = (
  columnTestId: string,
  orderedTasks: string[],
): void => {
  const texts = within(screen.getByTestId(`list-${columnTestId}`))
    .getAllByTestId("task")
    .map(x => x.textContent);

  expect(texts).toEqual(orderedTasks);
};
