import { useQuery } from 'react-query';
import { fetchGetTodos } from '../../../api/api';
import { LOCALSTORAGE_LOGINTOKEN } from '../../../utils/strings';
import TodoListPresentational from './TodoListPresentational';

function TodoListContainer() {
  const token = window.localStorage.getItem(LOCALSTORAGE_LOGINTOKEN);
  const response = useQuery('getTodos', () => fetchGetTodos({ token }), {
    retry: true,
    keepPreviousData: true,
  });

  // console.log(response);

  if (!token) {
    return <p>로그인이 필요합니다.</p>;
  }

  return response.isLoading ? (
    <p>로딩중 입니다.</p>
  ) : response.isError ? (
    <p>에러</p>
  ) : response.isSuccess ? (
    <TodoListPresentational
      token={token}
      error={response.error}
      todos={response.data.data.data.reverse()}
    />
  ) : (
    <p>실패</p>
  );
}

export default TodoListContainer;
