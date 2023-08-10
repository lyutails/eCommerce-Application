import { createSlice } from '@reduxjs/toolkit';

const userReducer = createSlice({
  name: 'user',
  initialState: {
    user: '',
    login: '',
    password: '',
    email: '',
    isAuth: false,
  },
  reducers: {
    creationUser(state, action) {
      state.user = action.payload;
    },
    creationLogin(state, action) {
      state.login = action.payload;
    },
    creationPassword(state, action) {
      state.password = action.payload;
    },
    creationEmail(state, action) {
      state.email = action.payload;
    },
    input(state) {
      state.isAuth = true;
    },
    exit(state) {
      state.isAuth = false;
    },
  },
});

export const {
  creationUser,
  creationLogin,
  creationPassword,
  creationEmail,
  input,
  exit,
} = userReducer.actions;
export default userReducer.reducer;
