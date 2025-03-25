import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '~/shared/api_types';

export interface UserState {
  isAuth: boolean;
  accessToken: string | null;
  user: User | null;
}

const initialState: UserState = {
  isAuth: false,
  accessToken: null,
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser(state, action: PayloadAction<{ accessToken: string; user: User }>) {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.isAuth = true;
    },
    setToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    removeUser(state) {
      state.accessToken = null;
      state.user = null;
      state.isAuth = false;
    },
  },
});

export const { saveUser, removeUser, setToken } = userSlice.actions;

export default userSlice.reducer;
