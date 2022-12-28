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
