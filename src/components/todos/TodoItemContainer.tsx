/* eslint-disable no-restricted-globals */
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchDeleteTodos } from '../../api/api';
import { TodoCurrent } from '../../types/atomsTypes';
import TodoItemPresentational from './TodoItemPresentational';

interface IProps {
  token: string;
  todoId: string;
  todoTitle: string;
  todoCurrent: TodoCurrent;
}

function TodoItemContainer({ token, todoId, todoTitle, todoCurrent }: IProps) {
  const params = useParams();
  const queryClient = useQueryClient();
  const mutation = useMutation(fetchDeleteTodos);

  const onRemove = () => {
    const result = confirm('정말 삭제 하시겠습니까?');
    if (result) {
      mutation.mutate(
        { todoId, token },
        {
          onSuccess(resultDate) {
            console.log(resultDate);
            queryClient.invalidateQueries('getTodos');
          },
          onError(error) {
            console.log(error);
          },
        },
      );
    }
  };

  return (
    <TodoItemPresentational
      todoId={todoId}
      todoTitle={todoTitle}
      params={params}
      onRemove={onRemove}
    />
  );
}

export default TodoItemContainer;
