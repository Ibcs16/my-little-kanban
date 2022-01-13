import { screen } from "@testing-library/react";

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
  it("should show correct title for todo status", () => {
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
  it("should show correct title for doing status", () => {
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
  it("should show correct title for done status", () => {
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
  it("should show no title for incorrect status", () => {
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
  it("should render initial todos", () => {
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
