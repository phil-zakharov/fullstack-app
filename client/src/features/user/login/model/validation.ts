import { yupResolver } from '@hookform/resolvers/yup';
import { object, ObjectSchema, string } from 'yup';
import { LoginForm } from '../types';

const _loginSch: ObjectSchema<LoginForm> = object({
  email: string().required('required email').email('is not email'),
  password: string().required('required password').length(5, 'less then min length'),
});

export const loginSch = yupResolver(_loginSch);
