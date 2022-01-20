import { Todo, TodoList } from "../features/todos/models/todo";
import API from "./API";

export interface UpdateListRequest {
  startListId: string;
  finishListId: string;
  itemId: string;
  fromItemIndex: number;
  toItemIndex: number;
  state: {
    lists: {
      [id: string]: TodoList;
    };
  };
}

export interface UpdateListResponse {
  startList: TodoList;
  finishList: TodoList;
}

async function fetchTodos() {
  const responseTodos = await API.get<Todo[]>("/todos");
  const responseLists = await API.get<Todo[]>("/lists");

  const items = responseTodos.data.reduce(
    (acc, currentTodo) => ({ ...acc, [currentTodo.id]: currentTodo }),
    {},
  );

  const lists = responseLists.data.reduce(
    (acc, currentList) => ({ ...acc, [currentList.id]: currentList }),
    {},
  );

  return { items, lists };
}

async function updateList(list: TodoList): Promise<UpdateListResponse> {
  const response = await API.patch<TodoList>(`/lists/${list.id}`, list);

  return { startList: response.data, finishList: {} as TodoList };
}

async function updateLists(
  startList: TodoList,
  finishList: TodoList,
): Promise<UpdateListResponse> {
  const responseFrom = await API.patch<TodoList>(
    `/lists/${startList.id}`,
    startList,
  );
  const responseTo = await API.patch<TodoList>(
    `/lists/${finishList.id}`,
    finishList,
  );

  return { startList: responseFrom.data, finishList: responseTo.data };
}

async function createTodo() {}

const Service = { fetchTodos, updateList, updateLists, createTodo };

export default Service;
