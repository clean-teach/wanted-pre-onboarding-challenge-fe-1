import { atom } from 'recoil';

export const isLoggedInState = atom({
  key: 'isLoggedIn',
  default: false,
});

interface IErrorState {
  status: null | number;
  message: string;
}
export const errorState = atom<IErrorState>({
  key: 'error',
  default: {
    status: null,
    message: '',
  },
});

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
export const TodosState = atom<ITodo[]>({
  key: 'todos',
  default: [],
});
