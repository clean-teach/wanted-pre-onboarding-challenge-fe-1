import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { errorState, ITodo, TodoCurrent, TodosState } from '../../atoms';
import { fetchCreateTodo } from '../../api';

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
  token: string;
}

interface IForm {
  newTodoTitle: string;
  newTodoContent: string;
}

function CreateTodo({ token }: IProps) {
  const [todos, setTodos] = useRecoilState(TodosState);
  const [fetchError, setFetchError] = useRecoilState(errorState);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>();

  const successNewTodoTitle = watch().newTodoTitle?.length > 0;
  const successNewTodoContent = watch().newTodoContent?.length > 0;
  const successNewTodo = successNewTodoTitle && successNewTodoContent;

  const onValid = (data: IForm) => {
    const response = fetchCreateTodo({
      title: data.newTodoTitle,
      content: data.newTodoContent,
      token: token,
    });
    response
      .then((response) => {
        const { title, content, id, createdAt, updatedAt }: ITodo =
          response.data.data;
        const newTodo: ITodo = {
          title,
          content,
          id,
          current: TodoCurrent.TO_DO,
          createdAt,
          updatedAt,
        };
        setTodos([newTodo, ...todos]);
        setFetchError({
          status: null,
          message: '',
        });
        setValue('newTodoTitle', '');
        setValue('newTodoContent', '');
      })
      .catch((error) => {
        console.log(error);
        setFetchError({
          status: error.response.status,
          message: error.response.data.details,
        });
      });
  };

  return (
    <Wrapper>
      <h3>할 일 목록 생성</h3>
      <form onSubmit={handleSubmit(onValid)}>
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
          <p className="warning">{errors.newTodoContent.message}</p>
        )}
        {watch().newTodoContent.length > 100 && (
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

export default CreateTodo;
