import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (body) => ({
        url: `user/create`,
        method: 'POST',
        body,
      }),
    })
  })
})

export const { useCreateUserMutation } = userApi