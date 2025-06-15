import { yupResolver } from '@hookform/resolvers/yup';
import { boolean, number, object, string } from 'yup';
import * as T from '~/features/todo/types';


export const createTodoSch = yupResolver<T.TodoItem>(object({
  id: number().required(),
  title: string().required('required'),
  completed: boolean().required(),
}))