import { useQuery } from 'react-query';
import { fetchGetTodos } from '../../../api/api';
import { LOCALSTORAGE_LOGINTOKEN } from '../../../utils/strings';
import TodoListPresentational from './TodoListPresentational';

function TodoListContainer() {
  const token = window.localStorage.getItem(LOCALSTORAGE_LOGINTOKEN);
  const mutation = useQuery('getTodos', () => fetchGetTodos({ token }), {
    retry: true,
    keepPreviousData: true,
  });

  console.log(mutation);

  if (!token) {
    return <p>로그인이 필요합니다.</p>;
  }

  return mutation.isLoading ? (
    <p>로딩중 입니다.</p>
  ) : mutation.isError ? (
    <p>에러</p>
  ) : mutation.isSuccess ? (
    <TodoListPresentational
      token={token}
      error={mutation.error}
      todos={mutation.data.data.data.reverse()}
    />
  ) : (
    <p>실패</p>
  );
}

export default TodoListContainer;
