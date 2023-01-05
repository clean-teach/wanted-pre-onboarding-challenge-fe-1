import { Link, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { fetchDeleteTodos } from '../../api';
import { TodoCurrent, TodosState } from '../../atoms';

const Wrapper = styled.li`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 4rem;
  align-content: center;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 0.25rem;
  &.isClicked {
    font-weight: bold;
    transform: scale(1.04);
    box-shadow: 0 0 2rem rgba(0, 0, 0, 0.4);
    transition: 0.5s;
  }
  a {
    display: flex;
    align-items: center;
    transition: 0.2s;
    &:hover {
      text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.5);
    }
  }
`;
const DeleteBtn = styled.button`
  padding: 0.5rem;
  background-color: ${(props) => props.theme.negativeAssistanceColor};
`;
const SwitchCurrent = styled.button``;

interface IProps {
  token: string;
  todoId: string;
  todoTitle: string;
  todoCurrent: TodoCurrent;
}

function TodoItem({ token, todoId, todoTitle, todoCurrent }: IProps) {
  const params = useParams();
  const setTodos = useSetRecoilState(TodosState);
  const onRemove = () => {
    const response = fetchDeleteTodos({ todoId, token });
    response
      .then(() => {
        setTodos((oldTodos) => oldTodos.filter((todo) => todo.id !== todoId));
      })
      .catch((error) => console.log(error));
  };

  return (
    <Wrapper className={todoId === params.todoId ? 'isClicked' : ''}>
      <Link to={`${todoId}`}>{todoTitle}</Link>
      <DeleteBtn onClick={onRemove}>삭제</DeleteBtn>
    </Wrapper>
  );
}

export default TodoItem;
