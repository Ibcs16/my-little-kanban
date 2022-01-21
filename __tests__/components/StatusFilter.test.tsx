import StatusFilter from "../../components/StatusFilter";
import userEvent from "@testing-library/user-event";

import {
  render,
  screen,
  waitFor,
  act,
  preloadedState,
} from "../../utils/test-utils";
import { theme } from "../../styles/theme";

describe("StatusFilter", () => {
  it("should init not showing dropdown", () => {
    render(<StatusFilter />, { preloadedState, withDragProvider: false });
    expect(screen.queryByTestId("filter-dropdown")).not.toBeInTheDocument();
  });
  it("should show dropdown if toggle button is clicked", async () => {
    render(<StatusFilter />, { preloadedState, withDragProvider: false });
    const toggleFilterButton = screen.getByTestId("filter-toggle-button");
    await act(() => userEvent.click(toggleFilterButton));
    await waitFor(() =>
      expect(screen.queryByTestId("filter-dropdown")).toBeInTheDocument(),
    );
  });
  describe("when dropdown is open", () => {
    describe("if closed with checked item", () => {
      it("should hide dropdown but retain active style for toggle button", async () => {
        render(<StatusFilter />, { preloadedState, withDragProvider: false });
        const [_, closeDropDownButton, __] = await openDropDown();

        // check if it has active style when open
        await waitFor(() =>
          expect(screen.getByTestId("filter-toggle-svg")).toHaveStyle({
            color: theme.colors.primary,
          }),
        );

        // check one item
        const [checkBoxElement] = screen.getAllByRole("checkbox");
        await act(() => userEvent.click(checkBoxElement));
        await waitFor(() =>
          expect(checkBoxElement).toHaveProperty("checked", true),
        );

        // close dropdown
        await act(() => userEvent.click(closeDropDownButton));

        // check if icon still have active style
        await waitFor(() =>
          expect(screen.getByTestId("filter-toggle-svg")).toHaveStyle({
            color: theme.colors.primary,
          }),
        );
      });
    });
    describe("if closed with no checked item", () => {
      it("should hide dropdown and remove style for toggle button", async () => {
        render(<StatusFilter />, { preloadedState, withDragProvider: false });
        const [_, closeDropDownButton, __] = await openDropDown();

        // check if it has active style when open
        await waitFor(() =>
          expect(screen.getByTestId("filter-toggle-svg")).toHaveStyle({
            color: theme.colors.primary,
          }),
        );

        // check no one item
        // close dropdown
        await act(() => userEvent.click(closeDropDownButton));

        // check if icon still have active style
        await waitFor(() =>
          expect(screen.getByTestId("filter-toggle-svg")).toHaveStyle({
            color: theme.colors.textSecondary,
          }),
        );
      });
    });
    it("should close dropdown if X button is clicked", async () => {
      render(<StatusFilter />, { preloadedState, withDragProvider: false });
      const [dropdownElement, closeDropDownButton, __] = await openDropDown();

      await act(() => userEvent.click(closeDropDownButton));
      await waitFor(() => expect(dropdownElement).not.toBeInTheDocument());
    });
    it("should close dropdown if clicked outside box", async () => {
      render(<StatusFilter />, { preloadedState, withDragProvider: false });
      const [dropdownElement, _, __, portal] = await openDropDown();
      await act(() => userEvent.click(portal));
      await waitFor(() => expect(dropdownElement).not.toBeInTheDocument());
    });
    it("should check item to true when clicked", async () => {
      render(<StatusFilter />, { preloadedState, withDragProvider: false });
      await openDropDown();
      const [todoCheckbox] = screen.getAllByRole("checkbox");

      expect(todoCheckbox).toHaveProperty("checked", false);
      await act(() => userEvent.click(todoCheckbox));
      expect(todoCheckbox).toHaveProperty("checked", true);
    });
    it("should uncheck item to true when double clicked", async () => {
      render(<StatusFilter />, { preloadedState, withDragProvider: false });
      await openDropDown();
      const [todoCheckbox] = screen.getAllByRole("checkbox");

      expect(todoCheckbox).toHaveProperty("checked", false);
      await act(() => userEvent.dblClick(todoCheckbox));
      expect(todoCheckbox).toHaveProperty("checked", false);
    });
    // it("should uncheck item to true when double clicked", () => {});
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
