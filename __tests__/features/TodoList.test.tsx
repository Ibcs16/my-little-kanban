// import { screen } from "@testing-library/react";

// import TodoList, { statusTitle } from "../../features/todos/TodoList";
// import { render } from "../../utils/test-utils";

// describe("TodoList", () => {
//   it("should show correct title for todo status", () => {
//     render(<TodoList status="todo" />);
//     const heading = screen.getByRole("heading");

//     expect(heading).toHaveTextContent(statusTitle.todo);
//   });
//   it("should show correct title for doing status", () => {
//     render(<TodoList status="doing" />);
//     const heading = screen.getByRole("heading");

//     expect(heading).toHaveTextContent(statusTitle.doing);
//   });
//   it("should show correct title for done status", () => {
//     render(<TodoList status="done" />);
//     const heading = screen.getByRole("heading");

//     expect(heading).toHaveTextContent(statusTitle.done);
//   });
//   it("should show no title for incorrect status", () => {
//     render(<TodoList status="fake-status" />);
//     const heading = screen.getByRole("heading");

//     expect(heading).toHaveTextContent("No status");
//   });
//   it("should render initial todos", () => {
//     render(<TodoList status="todo" />);

//     const todos = screen.getAllByRole("listitem");

//     expect(todos).toHaveLength(1);
//   });
// });
