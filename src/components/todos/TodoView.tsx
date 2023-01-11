import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { fetchGetTodoById, fetchUpdateTodo } from '../../api/api';
import { ITodo } from '../../types/atomsTypes';

const Wrapper = styled.div`
  .guide {
    font-size: 1rem;
  }
  h3 {
    display: none;
  }
  h4.title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  p.content {
    font-size: 1.25rem;
    font-weight: bold;
    line-height: 1.75rem;
  }
  dt {
    font-weight: bold;
    margin: 1rem 0 0.5rem;
  }
  dt,
  dd {
    font-size: 0.875rem;
  }
  button {
    width: 100%;
    margin-top: 1rem;
    padding: 1rem;
    font-size: 1rem;
  }
  input {
    width: 100%;
  }
`;

interface IProps {
  token: string;
}
interface ITodoForm {
  todoTitle: string;
  todoContent: string;
}

function TodoView({ token }: IProps) {
  const params = useParams();
  const [todo, setTodo] = useState<ITodo>();
  const [isEdit, setIsEdit] = useState(false);
  const { register, handleSubmit, setValue } = useForm();

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
  const onEditModeChange = () => {
    setIsEdit((current) => !current);
    setValue('todoTitle', todo?.title);
    setValue('todoContent', todo?.content);
  };
  const onEditModeEnd = () => {
    if (isEdit === true) {
      setIsEdit((current) => !current);
    }
  };
  const onEdit = (data: any) => {
    if (params.todoId) {
      const response = fetchUpdateTodo({
        todoId: params.todoId,
        token,
        title: data.todoTitle,
        content: data.todoContent,
      });
      response
        .then((response) => {
          setTodo(response.data.data);
          setIsEdit((current) => !current);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    onEditModeEnd();
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
    <Wrapper>
      <h3>자세히 보기</h3>
      {todo === undefined ? (
        <p className="guide">
          현재 선택 된 To do 가 없습니다. To do 를 클릭해 주세요.
        </p>
      ) : isEdit ? (
        <form onSubmit={handleSubmit(onEdit)}>
          <dl>
            <dt>
              <label htmlFor="todoTitle">제목</label>
            </dt>
            <dd>
              <input
                type="text"
                id="todoTitle"
                {...register('todoTitle', {
                  required: '제목을 입력 해 주세요.',
                  maxLength: 20,
                })}
              />
            </dd>
            <dt>
              <label htmlFor="todoContent">내용</label>
            </dt>
            <dd>
              <textarea
                id="todoContent"
                {...register('todoContent', {
                  required: '내용을 입력 해 주세요.',
                  maxLength: 100,
                  value: todo.content,
                })}
              />
            </dd>
          </dl>
          <button type="submit">확인</button>
          <button type="button" onClick={onEditModeEnd} className="cancel">
            취소
          </button>
        </form>
      ) : (
        <>
          <h4 className="title">{todo.title}</h4>
          <p className="content">{todo.content}</p>
          <dl>
            <dt>생성 날짜</dt>
            <dd>{getDate(todo.createdAt)}</dd>
            <dt>수정 날짜</dt>
            <dd>{getDate(todo.updatedAt)}</dd>
          </dl>
          <button onClick={onEditModeChange}>할 일 수정</button>
        </>
      )}
    </Wrapper>
  );
}

export default TodoView;
