import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchGetTodoById, fetchUpdateTodo } from '../../api/api';
import { ITodo } from '../../types/atomsTypes';
import { IViewTodoForm } from '../../types/todoComponentTypes';
import TodoViewPresentational from './TodoViewPresentational';

interface IProps {
  token: string;
}

function TodoViewContainer({ token }: IProps) {
  const { todoId } = useParams();
  const [todo, setTodo] = useState<ITodo>();
  const [isEdit, setIsEdit] = useState(false);

  const { register, handleSubmit, setValue } = useForm<IViewTodoForm>({
    defaultValues: {
      todoTitle: todo?.title,
      todoContent: todo?.content,
    },
  });

  const queryClient = useQueryClient();
  const getTodoByIdQueryResult = useQuery(
    ['getTodos', todoId],
    () => fetchGetTodoById({ todoId, token }),
    {
      enabled: !!todoId, // 코드 자동 실행 설정
    },
  );

  const onEditModeStart = () => {
    setIsEdit((current) => !current);
    setValue('todoTitle', getTodoByIdQueryResult.data?.data.data.title);
    setValue('todoContent', getTodoByIdQueryResult.data?.data.data.content);
  };
  const onEditModeEnd = () => {
    if (isEdit === true) {
      setIsEdit((current) => !current);
    }
  };
  const handleEditTodo = (data: IViewTodoForm) => {
    // if (params.todoId) {
    //   const response = fetchUpdateTodo({
    //     todoId: params.todoId,
    //     token,
    //     title: data.todoTitle,
    //     content: data.todoContent,
    //   });
    //   response
    //     .then((response) => {
    //       setTodo(response.data.data);
    //       setIsEdit((current) => !current);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
  };

  useEffect(() => {
    onEditModeEnd();
    // if (getTodoByIdQueryResult.isSuccess) {
    //   console.log(getTodoByIdQueryResult);
    // }
  }, [todoId]);

  return getTodoByIdQueryResult.isLoading ? (
    <p>로딩 중...</p>
  ) : getTodoByIdQueryResult.isError ? (
    <p>에러</p>
  ) : getTodoByIdQueryResult.isSuccess ? (
    <TodoViewPresentational
      todo={getTodoByIdQueryResult.data.data.data}
      isEdit={isEdit}
      handleEditTodo={handleEditTodo}
      onEditModeStart={onEditModeStart}
      onEditModeEnd={onEditModeEnd}
      handleSubmit={handleSubmit}
      register={register}
    />
  ) : (
    <p className="guide">
      현재 선택 된 To do 가 없습니다. To do 를 클릭해 주세요.
    </p>
  );
}

export default TodoViewContainer;
