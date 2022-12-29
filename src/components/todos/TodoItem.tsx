import React from 'react';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { fetchDeleteTodos } from '../../api';
import { TodoCurrent, TodosState } from '../../atoms';
import { LOCALSTORAGE_LOGINTOKEN } from '../../utils/strings';

const Wrapper = styled.li`
  width: 100%;
`;
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
      <button onClick={onRemove}>삭제</button>
    </Wrapper>
  );
}

export default TodoItem;
