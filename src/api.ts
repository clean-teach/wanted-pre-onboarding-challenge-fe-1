import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

interface IProps {
  email: string;
  password: string;
}

export const fetchSignUp = async ({ email, password }: IProps) => {
  return await axios.post(`${BASE_URL}/users/create`, {
    email,
    password,
  });
};
export const fetchLogIn = async ({ email, password }: IProps) => {
  return await axios.post(`${BASE_URL}/users/login`, {
    email,
    password,
  });
};
