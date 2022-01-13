import { screen } from "@testing-library/react";
import store from "../../app/store";
import TodoList, { statusTitle } from "../../features/todos/TodoList";
import { render } from "../../utils/test-utils";

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

describe("TodoList", () => {
  it("Should show correct title for todo status", () => {
    render(<TodoList status="todo" />, {
      preloadedState: {
        todos: {
          items: mockedTodos,
        },
      },
    });
    const heading = screen.getByRole("heading");

    expect(heading).toHaveTextContent(statusTitle.todo);
  });
  it("Should show correct title for doing status", () => {
    render(<TodoList status="doing" />, {
      preloadedState: {
        todos: {
          items: mockedTodos,
        },
      },
    });
    const heading = screen.getByRole("heading");

    expect(heading).toHaveTextContent(statusTitle.doing);
  });
  it("Should show correct title for done status", () => {
    render(<TodoList status="done" />, {
      preloadedState: {
        todos: {
          items: mockedTodos,
        },
      },
    });
    const heading = screen.getByRole("heading");

    expect(heading).toHaveTextContent(statusTitle.done);
  });
  it("Should show no title for incorrect status", () => {
    render(<TodoList status="fake-status" />, {
      preloadedState: {
        todos: {
          items: mockedTodos,
        },
      },
    });
    const heading = screen.getByRole("heading");

    expect(heading).toHaveTextContent("No status");
  });
  it("Renders initial todos", () => {
    render(<TodoList status="todo" />, {
      preloadedState: {
        todos: {
          items: mockedTodos,
        },
      },
    });

    const todos = screen.getAllByRole("listitem");

    expect(todos).toHaveLength(1);
  });
});
