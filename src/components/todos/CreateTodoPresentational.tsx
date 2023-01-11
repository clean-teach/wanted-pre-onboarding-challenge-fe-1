import {
  FieldErrorsImpl,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import styled from 'styled-components';
import { ICreateTodoForm } from '../../types/todoComponentTypes';
import { getValidCreateTodoFrom } from '../../hooks/todo/createTodo';
import { IErrorState } from '../../types/atomsTypes';

const Wrapper = styled.div`
  width: 100%;
  h3 {
    display: none;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;

    input {
      width: 100%;
    }
    button {
      width: 100%;
      font-size: 1rem;
      padding: 1rem;
    }
  }
`;

interface IProps {
  handleCreateTodo: (data: ICreateTodoForm) => void;
  fetchError: IErrorState;
  register: UseFormRegister<ICreateTodoForm>;
  watch: UseFormWatch<ICreateTodoForm>;
  handleSubmit: UseFormHandleSubmit<ICreateTodoForm>;
  errors: Partial<
    FieldErrorsImpl<{
      newTodoTitle: string;
      newTodoContent: string;
    }>
  >;
}

function CreateTodoPresentational({
  handleCreateTodo,
  fetchError,
  register,
  watch,
  handleSubmit,
  errors,
}: IProps) {
  const [successNewTodo] = getValidCreateTodoFrom(watch);

  return (
    <Wrapper>
      <h3>할 일 목록 생성</h3>
      <form onSubmit={handleSubmit(handleCreateTodo)}>
        <input
          {...register('newTodoTitle', {
            required: '제목을 입력해 주세요.',
            maxLength: 20,
          })}
          type="text"
          placeholder="제목을 입력해 주세요."
        />
        {errors.newTodoTitle?.type === 'required' && (
          <p className="warning">{errors.newTodoTitle.message}</p>
        )}
        {watch().newTodoTitle?.length > 20 && (
          <p className="warning">제목은 20자 이내로 작성해 주세요</p>
        )}
        <textarea
          {...register('newTodoContent', {
            required: '할 일을 입력해 주세요.',
            maxLength: 100,
          })}
          placeholder="새로 추가 할, 할 일을 입력해 주세요."
        />
        {errors.newTodoContent?.type === 'required' && (
          <p className="warning">{errors.newTodoContent?.message}</p>
        )}
        {watch().newTodoContent?.length > 100 && (
          <p className="warning">할 일은 100자 이내로 작성해 주세요</p>
        )}
        <button disabled={successNewTodo ? false : true}>할 일 생성</button>
        {fetchError.status !== null ? (
          <p className="warning">
            {fetchError.status} : {fetchError.message}
          </p>
        ) : null}
      </form>
    </Wrapper>
  );
}

export default CreateTodoPresentational;
