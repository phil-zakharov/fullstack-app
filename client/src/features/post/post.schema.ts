import { yupResolver } from '@hookform/resolvers/yup';
import * as T from './types';
import { object, string } from 'yup';

export const createPost = yupResolver<T.NewPost>(object({
  title: string().required(),
  text: string().required()
}))