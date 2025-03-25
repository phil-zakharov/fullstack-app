import { createApi } from '@reduxjs/toolkit/query/react';
import { typedFetchBaseQuery } from '~/shared/api/typedFetchBaseQuery';
import { removeUser, saveUser } from './store';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: typedFetchBaseQuery,
  endpoints: (build) => ({
    autoLogin: build.query({
      query: () => ({
        url: `user/auto-login`,
        method: 'GET',
      }),
      async onQueryStarted(_queryArgument, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(saveUser(data));
        } catch {
          console.log('error saveUser');
        }
      },
    }),
    signUp: build.mutation({
      query: (body) => ({
        url: `user/signup`,
        method: 'POST',
        body,
      }),
      async onQueryStarted(_queryArgument, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(saveUser(data));
        } catch {
          console.log('error saveUser');
        }
      },
    }),
    login: build.mutation({
      query: (body) => ({
        url: '/user/login',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_queryArgument, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(saveUser(data));
        } catch {
          console.log('error saveUser');
        }
      },
    }),
    logout: build.query({
      query: () => ({
        url: '/user/logout',
        method: 'GET',
      }),
      async onQueryStarted(_queryArgument, { dispatch }) {
        dispatch(removeUser());
      },
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation, useAutoLoginQuery, useLazyLogoutQuery } = userApi;
