import { act, screen, waitFor } from "@testing-library/react";
import StatusFilter from "../../features/todos/StatusFilter";
import userEvent from "@testing-library/user-event";

import { render } from "../../utils/test-utils";

describe("StatusFilter", () => {
  it("Should toggle item to true when first clicked", async () => {
    render(<StatusFilter />);
    const [todoCheckbox, doingCheckbox, doneCheckbox] =
      screen.getAllByRole("checkbox");

    expect(todoCheckbox.checked).toEqual(false);
    expect(doingCheckbox.checked).toEqual(false);
    expect(doneCheckbox.checked).toEqual(false);

    // Check todo checkbox
    await act(() => userEvent.click(todoCheckbox));
    await waitFor(() => expect(todoCheckbox.checked).toEqual(true));

    // Check doing checkbox
    await act(() => userEvent.click(doingCheckbox));
    await waitFor(() => expect(doingCheckbox.checked).toEqual(true));

    // Check done checkbox
    await act(() => userEvent.click(doneCheckbox));
    await waitFor(() => expect(doneCheckbox.checked).toEqual(true));
  });

  it("Should toggle item to false when doubled clicked", async () => {
    render(<StatusFilter />);
    const [todoCheckbox] = screen.getAllByRole("checkbox");

    expect(todoCheckbox.checked).toEqual(false);

    // Check todo checkbox
    await act(() => userEvent.click(todoCheckbox));
    await waitFor(() => expect(todoCheckbox.checked).toEqual(true));
    await act(() => userEvent.click(todoCheckbox));
    await waitFor(() => expect(todoCheckbox.checked).toEqual(false));
  });
});
