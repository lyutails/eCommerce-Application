import { createSlice } from '@reduxjs/toolkit';

const userReducer = createSlice({
  name: 'user',
  initialState: {
    user: {
      login: '',
      password: '',
      email: '',
    },
    isAuth: false,
  },
  reducers: {
    creationUser(state, action) {
      state.user = { ...action.payload };
    },
    input(state) {
      state.isAuth = true;
    },
    exit(state) {
      state.isAuth = false;
    },
  },
});

export const { creationUser, input, exit } = userReducer.actions;
export default userReducer.reducer;
