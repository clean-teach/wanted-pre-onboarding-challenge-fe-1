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

export interface ITodo {
  title: string;
  content: string;
  id: number;
  current?: 'toDo' | 'doing' | 'done';
  createdAt: number;
  updatedAt: number;
}
export const TodosState = atom<ITodo[]>({
  key: 'todos',
  default: [
    {
      title: '제목',
      content: '내용',
      id: Date.now(),
      current: 'toDo',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ],
});
