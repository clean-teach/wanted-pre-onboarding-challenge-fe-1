export interface IErrorState {
  status: null | number;
  message: string;
}
export enum TodoCurrent {
  'TO_DO' = 'TO_DO',
  'DOING' = 'DOING',
  'DONE' = 'DONE',
}
export interface ITodo {
  title: string;
  content: string;
  id: string;
  current: TodoCurrent;
  createdAt: string;
  updatedAt: string;
}
