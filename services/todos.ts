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

export interface AddTodoRequest {
  title: string;
  status: string;
}

async function createTodo(newTodo: AddTodoRequest) {
  const response = await API.post<Todo>("/todos", newTodo);
  return response.data;
}

async function fetchTodos() {
  const responseTodos = await API.get<Todo[]>("/todos");
  const responseLists = await API.get<Todo[]>("/lists");

  const items = (responseTodos.data?.length ? responseTodos.data : []).reduce(
    (acc, currentTodo) => ({ ...acc, [currentTodo.id]: currentTodo }),
    {},
  );

  const lists = (responseLists.data?.length ? responseLists.data : []).reduce(
    (acc, currentList) => ({ ...acc, [currentList.id]: currentList }),
    {},
  );

  return { items, lists };
}

async function updateTodo(todo: Todo): Promise<Todo> {
  const response = await API.patch<Todo>(`/lists/${todo.id}`, todo);

  return response.data;
}

async function deleteTodo(id: string) {
  const response = await API.delete<Todo>(`/todos/${id}`);
  return response.data;
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

const Service = {
  fetchTodos,
  updateList,
  updateLists,
  createTodo,
  deleteTodo,
  updateTodo,
};

export default Service;
