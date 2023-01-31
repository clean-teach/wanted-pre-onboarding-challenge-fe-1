import { atom } from 'recoil';
import { IErrorState } from '../types/atomsTypes';

export const isLoggedInState = atom({
  key: 'isLogged',
  default: false,
});

export const errorState = atom<IErrorState>({
  key: 'error',
  default: {
    status: null,
    message: '',
  },
});
