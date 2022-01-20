import List from "../../components/List";

import {
  render,
  screen,
  waitFor,
  within,
  act,
  mockedTodoLists,
  preloadedState,
  mockedTodos,
  fireEvent,
} from "../../utils/test-utils";

import {
  mockGetComputedStyle,
  mockDndSpacing,
  makeDnd,
  DND_DIRECTION_UP,
  DND_DIRECTION_DOWN,
  DND_DRAGGABLE_DATA_ATTR,
} from "react-beautiful-dnd-test-utils";
import { theme } from "../../styles/theme";

const mockedList = mockedTodoLists["1"];

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
    const list = screen.getByTestId(`list-${mockedList.id}`);

    fireEvent.dragStart(card);
    fireEvent.dragEnter(list);
    fireEvent.dragOver(list);
    // fireEvent.drop(card);

    expect(list).not.toHaveStyle({
      border: `2px dashed ${theme.colors.primary}`,
    });
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

// if shows list details [x]
// render cards [x]
// if list changes when moving card inside it

// if opens dialog when adding clicked
// if adds item to it when task added via modal
