import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  token: null,
  userId: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.userId = null;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { login, logout, setUserId } = userSlice.actions;
export default userSlice.reducer;