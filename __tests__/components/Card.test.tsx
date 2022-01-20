import List from "../../components/List";
import {
  mockedTodoLists,
  mockedTodos,
  preloadedState,
  render,
  screen,
  act,
  waitFor,
  within,
} from "../../utils/test-utils";
import userEvent from "@testing-library/user-event";

// if updates title when edited
describe("Card", () => {
  it("should show card details", () => {
    // Will use List Wrapper so it is has draggable Context
    const card = renderCardElement();
    expect(card.textContent).toEqual(mockedTodos["1"].title);
  });
  it("should show actions when card options toggled", async () => {
    // Will use List Wrapper so it is has draggable Context
    const card = renderCardElement();
    const menuToggle = within(card).getByTestId("menu-btn");
    expect(menuToggle).toBeInTheDocument();
    // should not be showing actions
    expect(within(card).queryByTestId("actions")).not.toBeInTheDocument();
    // hover over card and click menu toggle
    await act(() => userEvent.hover(menuToggle));
    await act(() => userEvent.click(menuToggle));
    // should show actions
    await waitFor(() =>
      expect(within(card).getByTestId("actions")).toBeInTheDocument(),
    );
  });
  it("should hide actions when card options toggled back", async () => {
    // Will use List Wrapper so it is has draggable Context
    const card = renderCardElement();
    const menuToggle = within(card).getByTestId("menu-btn");
    expect(menuToggle).toBeInTheDocument();
    // should not be showing actions
    expect(within(card).queryByTestId("actions")).not.toBeInTheDocument();
    // hover over card and click menu toggle
    await act(() => userEvent.hover(menuToggle));
    await act(() => userEvent.click(menuToggle));
    // should show actions
    await waitFor(() =>
      expect(within(card).getByTestId("actions")).toBeInTheDocument(),
    );
    // hover over card and click menu toggle
    await act(() => userEvent.hover(menuToggle));
    await act(() => userEvent.click(menuToggle));
    await waitFor(() =>
      expect(within(card).queryByTestId("actions")).not.toBeInTheDocument(),
    );
  });
});
const renderCardElement = (): HTMLElement => {
  render(<List data={mockedTodoLists["1"]} />, {
    withDragProvider: true,
    preloadedState,
  });

  const [card] = screen.getAllByRole("listitem");

  return card;
};
