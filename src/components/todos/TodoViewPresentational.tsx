import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import styled from 'styled-components';
import { ITodo } from '../../types/atomsTypes';
import { IViewTodoForm } from '../../types/todoComponentTypes';
import { getDateStringKorean } from '../../utils/function';

const Wrapper = styled.div`
  .guide {
    font-size: 1rem;
  }
  h3 {
    display: none;
  }
  h4.title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  p.content {
    font-size: 1.25rem;
    font-weight: bold;
    line-height: 1.75rem;
  }
  dt {
    font-weight: bold;
    margin: 1rem 0 0.5rem;
  }
  dt,
  dd {
    font-size: 0.875rem;
  }
  button {
    width: 100%;
    margin-top: 1rem;
    padding: 1rem;
    font-size: 1rem;
  }
  input {
    width: 100%;
  }
`;

interface IProps {
  todo: ITodo;
  isEdit: boolean;
  handleEditTodo: (data: any) => void;
  onEditModeChange: () => void;
  onEditModeEnd: () => void;
  handleSubmit: UseFormHandleSubmit<IViewTodoForm>;
  register: UseFormRegister<IViewTodoForm>;
}

function TodoViewPresentational({
  todo,
  isEdit,
  handleEditTodo,
  onEditModeEnd,
  onEditModeChange,
  handleSubmit,
  register,
}: IProps) {
  return (
    <Wrapper>
      <h3>자세히 보기</h3>
      {todo !== undefined &&
        (isEdit ? (
          <form onSubmit={handleSubmit(handleEditTodo)}>
            <dl>
              <dt>
                <label htmlFor="todoTitle">제목</label>
              </dt>
              <dd>
                <input
                  type="text"
                  id="todoTitle"
                  {...register('todoTitle', {
                    required: '제목을 입력 해 주세요.',
                    maxLength: 20,
                  })}
                />
              </dd>
              <dt>
                <label htmlFor="todoContent">내용</label>
              </dt>
              <dd>
                <textarea
                  id="todoContent"
                  {...register('todoContent', {
                    required: '내용을 입력 해 주세요.',
                    maxLength: 100,
                    // value: todo.content,
                  })}
                />
              </dd>
            </dl>
            <button type="submit">확인</button>
            <button type="button" onClick={onEditModeEnd} className="cancel">
              취소
            </button>
          </form>
        ) : (
          <>
            <h4 className="title">{todo.title}</h4>
            <p className="content">{todo.content}</p>
            <dl>
              <dt>생성 날짜</dt>
              <dd>{getDateStringKorean(todo.createdAt)}</dd>
              <dt>수정 날짜</dt>
              <dd>{getDateStringKorean(todo.updatedAt)}</dd>
            </dl>
            <button onClick={onEditModeChange}>할 일 수정</button>
          </>
        ))}
    </Wrapper>
  );
}

export default TodoViewPresentational;
