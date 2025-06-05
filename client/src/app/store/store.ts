import { configureStore } from '@reduxjs/toolkit';
import user from '~/features/user/store';
import todo from '~/features/todo/store';
import { userApi } from '~/features/user/api';
import { postApi } from '~/features/post/api';
import { todoApi } from '~/features/todo/api';

export const store = configureStore({
  reducer: {
    user,
    todo,
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(postApi.middleware)
      .concat(todoApi.middleware),
});
