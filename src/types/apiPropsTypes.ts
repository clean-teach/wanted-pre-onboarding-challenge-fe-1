export interface IPropsAuths {
  email: string;
  password: string;
}
export interface IPropsPostTodos {
  title: string;
  content: string;
  token: string | null;
}
export interface IPropsGetTodos {
  token: string | null;
}
export interface IPropsTodo {
  todoId: string | undefined;
  token: string | null;
}
export interface IPropsUpdateTodo {
  todoId: string | undefined;
  token: string | null;
  title: string;
  content: string;
}
