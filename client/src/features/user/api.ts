import { createApi } from '@reduxjs/toolkit/query/react';
import { typedFetchBaseQuery } from '~/shared/api/typedFetchBaseQuery';
import { saveUser } from './store';

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
      async onQueryStarted(_queryArgument, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            dispatch(saveUser(data))
          } catch {
            console.log('error saveUser')
          }
      },
    }),
    login: build.mutation({
      query: (body) => ({
        url: '/user/login',
        method: "POST",
        body
      }),
      async onQueryStarted(_queryArgument, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(saveUser(data))
        } catch {
          console.log('error saveUser')
        }
    },
    })
  })
})

export const { useSignUpMutation, useLoginMutation } = userApi