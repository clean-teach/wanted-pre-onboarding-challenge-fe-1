/* eslint-disable no-restricted-globals */
import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { fetchDeleteTodos } from '../../api/api';
import { TodosState } from '../../atoms/atoms';
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
  const setTodos = useSetRecoilState(TodosState);
  const onRemove = () => {
    const result = confirm('정말 삭제 하시겠습니까?');
    if (result) {
      const response = fetchDeleteTodos({ todoId, token });
      response
        .then(() => {
          setTodos((oldTodos) => oldTodos.filter((todo) => todo.id !== todoId));
        })
        .catch((error) => console.log(error));
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
