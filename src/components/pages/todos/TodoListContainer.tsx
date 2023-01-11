import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { fetchGetTodos } from '../../../api/api';
import { TodosState } from '../../../atoms/atoms';
import { LOCALSTORAGE_LOGINTOKEN } from '../../../utils/strings';
import TodoListPresentational from './TodoListPresentational';

function TodoListContainer() {
  const navigate = useNavigate();
  const token = window.localStorage.getItem(LOCALSTORAGE_LOGINTOKEN);
  const [todos, setTodos] = useRecoilState(TodosState);
  const [error, setError] = useState('');

  useEffect(() => {
    if (token) {
      const response = fetchGetTodos({ token });
      response
        .then((response) => {
          const responseTodos = response.data.data;
          setTodos(responseTodos.reverse());
          setError('');
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
        });
    }
  }, [todos]);

  if (!token) {
    navigate('/auth/login');
    return <p>로그인이 필요합니다.</p>;
  }

  return <TodoListPresentational token={token} error={error} todos={todos} />;
}

export default TodoListContainer;
