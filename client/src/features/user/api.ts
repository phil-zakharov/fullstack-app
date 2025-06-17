import { createApi } from '@reduxjs/toolkit/query/react';
import { typedFetchBaseQuery } from '~/shared/api/typedFetchBaseQuery';
import { removeUser, saveUser } from './store';
import { LoginForm } from './login/types';
import { SignUpForm } from './sign_up/types';
import { PublicUser } from './types';

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
      query: (body: SignUpForm) => ({
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
      query: (body: LoginForm) => ({
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
    users: build.query<PublicUser[], void>({
      query: () => ({
        url: '/user/all',
        method: 'GET',
      }),
    }),
    addFriend: build.mutation<void, { email: string }>({
      query: (body) => ({
        url: '/user/friend',
        method: 'PATCH',
        body,
      }),
    }),
    deleteFriend: build.mutation<void, { email: string }>({
      query: (body) => ({
        url: '/user/friend',
        method: "DELETE",
        body
      })
    }),
    friends: build.query<PublicUser[], { email: string}>({
      query: ({ email }) => ({
        url: `/user/friend?email=${email}`,
        method: "GET",
      })
    })
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useAutoLoginQuery,
  useLazyLogoutQuery,
  useUsersQuery,
  useAddFriendMutation,
  useDeleteFriendMutation,
  useLazyFriendsQuery
} = userApi;
