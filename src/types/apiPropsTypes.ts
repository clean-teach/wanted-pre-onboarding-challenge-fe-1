export interface IPropsAuths {
  email: string;
  password: string;
}
export interface IPropsPostTodos {
  title: string;
  content: string;
  token: string;
}
export interface IPropsGetTodos {
  token: string;
}
export interface IPropsTodo {
  todoId: string;
  token: string;
}
export interface IPropsUpdateTodo {
  todoId: string;
  token: string;
  title: string;
  content: string;
}
