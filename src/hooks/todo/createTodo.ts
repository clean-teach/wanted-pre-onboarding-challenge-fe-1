import { UseFormWatch } from 'react-hook-form';
import { ICreateTodoForm } from '../../types/todoComponentTypes';

export const getValidCreateTodoFrom = (
  watch: UseFormWatch<ICreateTodoForm>,
) => {
  const successNewTodoTitle = watch().newTodoTitle?.length > 0;
  const successNewTodoContent = watch().newTodoContent?.length > 0;
  const successNewTodo = successNewTodoTitle && successNewTodoContent;

  return [successNewTodoTitle, successNewTodoContent, successNewTodo];
};
