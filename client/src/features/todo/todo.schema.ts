import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';

export const createTodoSch = yupResolver(object({
  title: string().required('required')
}))