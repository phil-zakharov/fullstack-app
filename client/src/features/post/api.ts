import { createApi } from '@reduxjs/toolkit/query/react';
import { typedFetchBaseQuery } from '~/shared/api/typedFetchBaseQuery';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: typedFetchBaseQuery,
  endpoints: (build) => ({
    getAll: build.query({
      query: () => ({
        url: 'post/posts'
      })
    })
  })
})

export const { useLazyGetAllQuery } = postApi;