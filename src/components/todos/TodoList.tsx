import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { fetchGetTodos } from '../../api';
import { TodosState } from '../../atoms';
import { LOCALSTORAGE_LOGINTOKEN } from '../../utils/strings';
import CreateTodo from './CreateTodo';

const Wrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const TodoArea = styled.div`
  width: 760px;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.4);
  padding: 2rem;
`;
const Title = styled.h2`
  text-align: center;
  font-weight: bold;
  font-size: 2rem;
`;

function TodoList() {
  const token = window.localStorage.getItem(LOCALSTORAGE_LOGINTOKEN);
  const [todos, setTodos] = useRecoilState(TodosState);

  useEffect(() => {
    if (token) {
      const response = fetchGetTodos({ token });
      response.then((response) => {
        const responseTodos = response.data.data;
        setTodos(responseTodos);
      });
    }
  }, []);
  // useEffect(() => {
  //   console.log('todos : ', todos);
  // }, [todos]);

  return (
    <Wrapper>
      <TodoArea>
        <Title>To do List</Title>
        <CreateTodo />
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      </TodoArea>
    </Wrapper>
  );
}

export default TodoList;
