import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import Home from "../pages/index";
import { render } from "../utils/test-utils";
import userEvent from "@testing-library/user-event";

const mockedTodos = [
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

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /welcome/i,
    });

    expect(heading).toBeInTheDocument();
  });

  describe("when user searches for term", () => {
    it("should only show items matching the text", async () => {
      render(<Home />, {
        preloadedState: {
          todos: {
            items: mockedTodos,
            filterStatus: [],
            search: "",
          },
        },
      });

      // check for initial todos
      const todos = screen.getAllByRole("listitem");
      expect(todos).toHaveLength(3);

      // search for todo with text "Init"
      const searchbox = screen.getByTestId("search-box");
      await act(() => userEvent.type(searchbox, "Init"));

      // check if list has decreased to one matching item
      await waitFor(() =>
        expect(screen.getAllByRole("listitem")).toHaveLength(1),
      );

      // check if remaining item is indeed the one we searched for
      const [remainingTodo] = screen.getAllByRole("listitem");
      expect(remainingTodo).toHaveTextContent(mockedTodos[1].title);
    });
  });
  describe("when user check filter boxes", () => {
    it("should only show items matching the filtered status", async () => {
      render(<Home />, {
        preloadedState: {
          todos: {
            items: mockedTodos,
            filterStatus: [],
            search: "",
          },
        },
      });

      // check for initial todos
      const todos = screen.getAllByRole("listitem");
      expect(todos).toHaveLength(3);

      // select todoCheckbox
      const [todoCheckbox] = screen.getAllByRole("checkbox");
      await act(() => userEvent.click(todoCheckbox));

      // check if list has decreased to one matching item
      await waitFor(() =>
        expect(screen.getAllByRole("listitem")).toHaveLength(1),
      );

      // check if remaining item is indeed the one we filtered for
      const [remainingTodo] = screen.getAllByRole("listitem");
      expect(remainingTodo).toHaveTextContent(mockedTodos[0].title);
    });
  });
});
