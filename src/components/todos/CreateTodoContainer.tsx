import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { fetchCreateTodo } from '../../api/api';
import { ICreateTodoForm } from '../../types/todoComponentTypes';
import CreateTodoPresentational from './CreateTodoPresentational';
import { useMutation, useQueryClient } from 'react-query';

interface IProps {
  token: string;
}

function CreateTodoContainer({ token }: IProps) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ICreateTodoForm>();
  const queryClient = useQueryClient();
  const mutation = useMutation(fetchCreateTodo);

  const handleCreateTodo = useCallback(
    async (input: ICreateTodoForm) => {
      await mutation.mutate(
        {
          title: input.newTodoTitle,
          content: input.newTodoContent,
          token: token,
        },
        {
          onSuccess(resultDate) {
            console.log(resultDate);
            queryClient.invalidateQueries('getTodos');
            setValue('newTodoTitle', '');
            setValue('newTodoContent', '');
          },
          onError(error) {
            console.log(error);
          },
        },
      );
    },
    [mutation],
  );

  return (
    <CreateTodoPresentational
      handleCreateTodo={handleCreateTodo}
      register={register}
      watch={watch}
      handleSubmit={handleSubmit}
      errors={errors}
    />
  );
}

export default CreateTodoContainer;
