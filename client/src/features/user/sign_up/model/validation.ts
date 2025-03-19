import { object, ObjectSchema, string } from 'yup';
import { SignUpForm } from '../types';
import { yupResolver } from '@hookform/resolvers/yup';

const _signUpSch: ObjectSchema<SignUpForm> = object({
  name: string().required('name required'),
  email: string().required('email required').email(),
  password: string().required('pass required')
})

export const signUpSch = yupResolver(_signUpSch)