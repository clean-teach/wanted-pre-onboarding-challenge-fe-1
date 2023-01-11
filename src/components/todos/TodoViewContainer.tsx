import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { fetchGetTodoById, fetchUpdateTodo } from '../../api/api';
import { ITodo } from '../../types/atomsTypes';
import { IViewTodoForm } from '../../types/todoComponentTypes';
import TodoViewPresentational from './TodoViewPresentational';

interface IProps {
  token: string;
}

function TodoViewContainer({ token }: IProps) {
  const params = useParams();
  const [todo, setTodo] = useState<ITodo>();
  const [isEdit, setIsEdit] = useState(false);

  const { register, handleSubmit, setValue } = useForm<IViewTodoForm>({
    defaultValues: {
      todoTitle: todo?.title,
      todoContent: todo?.content,
    },
  });

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
    if (todo) {
      setIsEdit((current) => !current);
      setValue('todoTitle', todo.title);
      setValue('todoContent', todo.content);
    }
  };
  const onEditModeEnd = () => {
    if (isEdit === true) {
      setIsEdit((current) => !current);
    }
  };
  const handleEditTodo = (data: any) => {
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

  if (!todo) {
    return (
      <p className="guide">
        현재 선택 된 To do 가 없습니다. To do 를 클릭해 주세요.
      </p>
    );
  }

  return (
    <TodoViewPresentational
      todo={todo}
      isEdit={isEdit}
      handleEditTodo={handleEditTodo}
      onEditModeChange={onEditModeChange}
      onEditModeEnd={onEditModeEnd}
      getDate={getDate}
      handleSubmit={handleSubmit}
      register={register}
    />
  );
}

export default TodoViewContainer;
