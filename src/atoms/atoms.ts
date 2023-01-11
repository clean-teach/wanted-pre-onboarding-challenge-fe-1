import { atom } from 'recoil';
import { IErrorState, ITodo } from '../types/atomsTypes';

export const isLoggedInState = atom({
  key: 'isLoggedIn',
  default: false,
});

export const errorState = atom<IErrorState>({
  key: 'error',
  default: {
    status: null,
    message: '',
  },
});

export const TodosState = atom<ITodo[]>({
  key: 'todos',
  default: [],
});
