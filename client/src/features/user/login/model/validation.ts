import { yupResolver } from '@hookform/resolvers/yup';
import { object, ObjectSchema, string } from 'yup';
import { LoginForm } from '../types';

const _loginSch: ObjectSchema<LoginForm> = object({
  email: string().required('required email').email('is not email'),
  password: string().required('required password').min(5),
});

export const loginSch = yupResolver(_loginSch);
