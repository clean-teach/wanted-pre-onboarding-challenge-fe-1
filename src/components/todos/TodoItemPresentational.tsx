/* eslint-disable no-restricted-globals */
import { Link, Params } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-content: center;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 0.25rem;
  &.isClicked {
    font-weight: bold;
    transform: scale(1.04);
    box-shadow: 0 0 2rem rgba(0, 0, 0, 0.4);
    transition: 0.2s;
  }
  a {
    display: flex;
    align-items: center;
    &:hover {
      text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.5);
    }
  }
`;
const DeleteBtn = styled.button`
  padding: 0.5rem;
  background: none;
`;

interface IProps {
  todoId: string;
  todoTitle: string;
  params: Readonly<Params<string>>;
  onRemove: () => void;
}

function TodoItemPresentational({
  todoId,
  todoTitle,
  params,
  onRemove,
}: IProps) {
  return (
    <Wrapper className={todoId === params.todoId ? 'isClicked' : ''}>
      <Link to={`${todoId}`}>{todoTitle}</Link>
      <DeleteBtn onClick={onRemove} title="삭제">
        ❌
      </DeleteBtn>
    </Wrapper>
  );
}

export default TodoItemPresentational;
