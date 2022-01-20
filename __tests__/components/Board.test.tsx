// If shows lists when in state
// if lists changes when moving cards between lists

import Board from "../../components/Board";
import { theme } from "../../styles/theme";
import {
  render,
  preloadedState,
  screen,
  fireEvent,
  within,
  waitFor,
  act,
} from "../../utils/test-utils";

// if color change when dragging card over list
describe("Board", () => {
  it("should render all lists", () => {
    render(<Board />, {
      preloadedState,
      withDragProvider: false,
    });
    const lists = screen.getAllByTestId("list");
    expect(lists).toHaveLength(3);
  });
});
