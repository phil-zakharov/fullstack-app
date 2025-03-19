import { createApi } from '@reduxjs/toolkit/query/react';
import { User } from '~/shared/api_types';
import { typedFetchBaseQuery } from '../typedFetchBaseQuery';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: typedFetchBaseQuery,
  endpoints: (build) => ({
    signUp: build.mutation({
      query: (body) => ({
        url: `user/signup`,
        method: 'POST',
        body,
      }),
    }),
    login: build.mutation<User, unknown>({
      query: (body) => ({
        url: '/user/login',
        method: "POST",
        body
      })
    })
  })
})

export const { useSignUpMutation, useLoginMutation } = userApi