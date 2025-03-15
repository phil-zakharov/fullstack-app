import { configureStore } from '@reduxjs/toolkit'
import user from '~/features/user/store'
import { userApi } from '~/shared/api/user'

export const store = configureStore({
  reducer: {
    user,
    [userApi.reducerPath]: userApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
})
