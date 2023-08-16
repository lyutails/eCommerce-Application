import { createSlice } from '@reduxjs/toolkit';
const language = localStorage.getItem('isAuth');
let isAuth;
language && language === 'true' ? (isAuth = true) : (isAuth = false);
const userReducer = createSlice({
  name: 'user',
  initialState: {
    user: {
      login: '',
      password: '',
      email: '',
    },
    isAuth,
  },
  reducers: {
    createUser(state, action) {
      state.user = { ...action.payload };
    },
    updateCustomer(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
    setAuthStatus(state, action) {
      state.isAuth = action.payload;
    },
  },
});

export const { createUser, setAuthStatus } = userReducer.actions;
export default userReducer.reducer;
