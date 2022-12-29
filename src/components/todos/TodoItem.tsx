import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { fetchDeleteTodos } from '../../api';
import { TodoCurrent, TodosState } from '../../atoms';

const Wrapper = styled.li`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 4rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 0.25rem;
  a:hover {
    text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.5);
    transition: 0.2s;
  }
`;
const DeleteBtn = styled.button``;
const SwitchCurrent = styled.button``;

interface IProps {
  token: string;
  todoId: string;
  todoTitle: string;
  todoCurrent: TodoCurrent;
}

function TodoItem({ token, todoId, todoTitle, todoCurrent }: IProps) {
  const setTodos = useSetRecoilState(TodosState);
  const onRemove = () => {
    const response = fetchDeleteTodos({ todoId, token });
    response
      .then((response) => {
        setTodos((oldTodos) => oldTodos.filter((todo) => todo.id !== todoId));
      })
      .catch((error) => console.log(error));
  };

  return (
    <Wrapper>
      <Link to={`${todoId}`}>{todoTitle}</Link>
      <DeleteBtn onClick={onRemove}>삭제</DeleteBtn>
    </Wrapper>
  );
}

export default TodoItem;
