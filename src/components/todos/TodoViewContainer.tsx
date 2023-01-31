import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchGetTodoById, fetchUpdateTodo } from '../../api/api';
import { IViewTodoForm } from '../../types/todoComponentTypes';
import TodoViewPresentational from './TodoViewPresentational';

interface IProps {
  token: string;
}

function TodoViewContainer({ token }: IProps) {
  const { todoId } = useParams();
  const [isEdit, setIsEdit] = useState(false);

  const queryClient = useQueryClient();
  const getTodoByIdQueryResult = useQuery(
    ['getTodos', todoId],
    () => fetchGetTodoById({ todoId, token }),
    {
      enabled: !!todoId, // 코드 자동 실행 설정
    },
  );
  const updateTodoMutation = useMutation(fetchUpdateTodo);

  const { register, handleSubmit, setValue } = useForm<IViewTodoForm>({
    defaultValues: {
      todoTitle: getTodoByIdQueryResult.data?.data.data.title,
      todoContent: getTodoByIdQueryResult.data?.data.data.content,
    },
  });

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
  const handleEditTodo = (inputData: IViewTodoForm) => {
    updateTodoMutation.mutate(
      {
        todoId,
        token,
        title: inputData.todoTitle,
        content: inputData.todoContent,
      },
      {
        onSuccess(resultDate) {
          queryClient.invalidateQueries('getTodos');
          onEditModeEnd();
        },
        onError(error) {
          console.log(error);
        },
      },
    );
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
