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

interface IPropsPostTodo {
  title: string;
  content: string;
  token: string;
}
interface IPropsGetTodo {
  token: string;
}
interface IPropsDeleteTodo {
  todoId: string;
  token: string;
}
export const fetchCreateTodo = async ({
  title,
  content,
  token,
}: IPropsPostTodo) => {
  return await axios.post(
    `${BASE_URL}/todos`,
    { title, content },
    {
      headers: {
        Authorization: token,
      },
    },
  );
};
export const fetchGetTodos = async ({ token }: IPropsGetTodo) => {
  return await axios.get(`${BASE_URL}/todos`, {
    headers: {
      Authorization: token,
    },
  });
};
export const fetchDeleteTodos = async ({ todoId, token }: IPropsDeleteTodo) => {
  return await axios.delete(`${BASE_URL}/todos/${todoId}`, {
    headers: {
      Authorization: token,
    },
  });
};
