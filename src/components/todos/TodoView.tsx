import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGetTodoById } from '../../api';
import { ITodo } from '../../atoms';

interface IProps {
  token: string;
}

function TodoView({ token }: IProps) {
  const params = useParams();
  const [todo, setTodo] = useState<ITodo>();
  const getDate = (date: string | undefined) => {
    if (date) {
      const dateType = new Date(date);
      const year = dateType.getFullYear();
      const month = dateType.getMonth() + 1;
      const day = dateType.getDate();
      const hour = dateType.getHours();
      const minute = dateType.getMinutes();
      const second = dateType.getSeconds();
      return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분 ${second}초`;
    }
  };

  useEffect(() => {
    if (params.todoId) {
      const response = fetchGetTodoById({ todoId: params.todoId, token });
      response
        .then((response) => {
          setTodo(response.data.data);
        })
        .catch((error) => console.log(error));
    }
  }, [params]);

  return (
    <div>
      <h3>할 일 목록 자세히 보기</h3>
      <dl>
        <dt>제목</dt>
        <dd>{todo?.title}</dd>
        <dt>내용</dt>
        <dd>{todo?.content}</dd>
        <dt>생성 날짜</dt>
        <dd>{getDate(todo?.createdAt)}</dd>
        <dt>수정 날짜</dt>
        <dd>{getDate(todo?.updatedAt)}</dd>
      </dl>
      <button>수정</button>
    </div>
  );
}

export default TodoView;
