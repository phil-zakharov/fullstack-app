import { configureStore } from '@reduxjs/toolkit';
import user from '~/features/user/store';
import { userApi } from '~/features/user/api';
import { postApi } from '~/features/post/api';

export const store = configureStore({
  reducer: {
    user,
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware).concat(postApi.middleware),
});
