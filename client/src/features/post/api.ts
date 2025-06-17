import { createApi } from '@reduxjs/toolkit/query/react';
import { typedFetchBaseQuery } from '~/shared/api/typedFetchBaseQuery';
import * as T from './types';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: typedFetchBaseQuery,
  endpoints: (build) => ({
    getAllPosts: build.query<T.Post[], void>({
      query: () => ({
        url: 'post/posts'
      })
    }),
    addPost: build.mutation<void, T.NewPost>({
      query: (body) => ({
        url: 'post/posts',
        method: "POST",
        body
      })
    })
  })
})

export const { useGetAllPostsQuery, useAddPostMutation } = postApi;