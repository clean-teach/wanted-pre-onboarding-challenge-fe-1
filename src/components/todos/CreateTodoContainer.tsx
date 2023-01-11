import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { errorState, TodosState } from '../../atoms/atoms';
import { fetchCreateTodo } from '../../api/api';
import { ITodo, TodoCurrent } from '../../types/atomsTypes';
import { ICreateTodoForm } from '../../types/todoComponentTypes';
import CreateTodoPresentational from './CreateTodoPresentational';

interface IProps {
  token: string;
}

function CreateTodoContainer({ token }: IProps) {
  const [todos, setTodos] = useRecoilState(TodosState);
  const [fetchError, setFetchError] = useRecoilState(errorState);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ICreateTodoForm>();

  const handleCreateTodo = (data: ICreateTodoForm) => {
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
    <CreateTodoPresentational
      handleCreateTodo={handleCreateTodo}
      fetchError={fetchError}
      register={register}
      watch={watch}
      handleSubmit={handleSubmit}
      errors={errors}
    />
  );
}

export default CreateTodoContainer;
