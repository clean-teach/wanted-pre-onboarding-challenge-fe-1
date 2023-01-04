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

interface IPropsPostTodos {
  title: string;
  content: string;
  token: string;
}
interface IPropsGetTodos {
  token: string;
}
interface IPropsTodo {
  todoId: string;
  token: string;
}
interface IPropsUpdateTodo {
  todoId: string;
  token: string;
  title: string;
  content: string;
}
export const fetchCreateTodo = async ({
  title,
  content,
  token,
}: IPropsPostTodos) => {
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
export const fetchGetTodos = async ({ token }: IPropsGetTodos) => {
  return await axios.get(`${BASE_URL}/todos`, {
    headers: {
      Authorization: token,
    },
  });
};
export const fetchDeleteTodos = async ({ todoId, token }: IPropsTodo) => {
  return await axios.delete(`${BASE_URL}/todos/${todoId}`, {
    headers: {
      Authorization: token,
    },
  });
};
export const fetchGetTodoById = async ({ todoId, token }: IPropsTodo) => {
  return await axios.get(`${BASE_URL}/todos/${todoId}`, {
    headers: {
      Authorization: token,
    },
  });
};
export const fetchUpdateTodo = async ({
  todoId,
  token,
  title,
  content,
}: IPropsUpdateTodo) => {
  return await axios.put(
    `${BASE_URL}/todos/${todoId}`,
    { title, content },
    {
      headers: {
        Authorization: token,
      },
    },
  );
};
