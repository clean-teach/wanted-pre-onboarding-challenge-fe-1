import styled from 'styled-components';
import { ITodo } from '../../../types/atomsTypes';
import CreateTodoContainer from '../../todos/CreateTodoContainer';
import TodoItemContainer from '../../todos/TodoItemContainer';
import TodoViewContainer from '../../todos/TodoViewContainer';

const Wrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 4rem);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }
  h3 {
    text-align: center;
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }
`;
const TodoArea = styled.div`
  width: 1024px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 20rem 1fr;
  gap: 2rem;
  & > *:nth-child(2) {
    grid-column: 2/3;
    grid-row: 1/3;
  }
  & > div > div {
    box-shadow: 0 0 2rem rgba(0, 0, 0, 0.1);
    padding: 2rem;
    border-radius: 0.5rem;
  }
`;
const FixedArea = styled.div`
  position: fixed;
  width: calc(1024px / 2);
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding-right: 1rem;
`;
const ScrollArea = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
`;
const ListArea = styled.div`
  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

interface IProps {
  token: string;
  error: string;
  todos: ITodo[];
}

function TodoListPresentational({ token, error, todos }: IProps) {
  return (
    <Wrapper>
      <TodoArea>
        <FixedArea>
          <CreateTodoContainer token={token} />
          <TodoViewContainer token={token} />
        </FixedArea>
        <ScrollArea>
          <ListArea>
            <h2>할 일 목록</h2>
            {error === '' ? (
              <ul>
                {todos.map((todo) => {
                  return (
                    <TodoItemContainer
                      key={todo.id}
                      token={token}
                      todoId={todo.id}
                      todoTitle={todo.title}
                      todoCurrent={todo.current}
                    />
                  );
                })}
              </ul>
            ) : (
              <p>{error}</p>
            )}
          </ListArea>
        </ScrollArea>
      </TodoArea>
    </Wrapper>
  );
}

export default TodoListPresentational;
