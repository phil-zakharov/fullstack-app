import { createApi } from '@reduxjs/toolkit/query/react';
import { typedFetchBaseQuery } from '~/shared/api/typedFetchBaseQuery';
import { TodoItem } from './types';
import { setTodos } from './store';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: typedFetchBaseQuery,
  endpoints: (build) => ({
    getTodos: build.query({
      query: () => ({
        url: "todo/all",
        method: "GET"
      }),
      async onQueryStarted(_queryArgument, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            dispatch(setTodos(data))
          } catch (error) {
            console.error('Server error:', error)
          }
      },
    }),
    createTodo: build.mutation({
      query: (body: TodoItem) => ({
        url: 'todo/create',
        method: "POST",
        body
      })
    })
  })
})

export const { useLazyGetTodosQuery, useCreateTodoMutation } = todoApi;