export interface Todo {
  id: string;
  title: string;
  status: string;
  index?: number;
}

export interface TodoList {
  id: string;
  title: string;
  statusName: string;
  cardIds: string[];
  order: string;
}
