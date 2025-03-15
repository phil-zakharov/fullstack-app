import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  isAuth: boolean;
  name: string | null;
  email: string | null;
  avatarUrl: string | null;
}

const initialState: UserState = {
  isAuth: false,
  name: null,
  email: null,
  avatarUrl: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser() {}
  }
})

export const { setUser } = userSlice.actions;

export default userSlice.reducer