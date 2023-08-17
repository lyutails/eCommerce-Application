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
    customerId: '',
  },
  reducers: {
    createUser(state, action) {
      state.user = { ...action.payload };
    },
    createCustomerId(state, action) {
      state.customerId = action.payload;
    },
    updateCustomer(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
    setAuthStatus(state, action) {
      state.isAuth = action.payload;
    },
  },
});

export const { createUser, setAuthStatus, createCustomerId } =
  userReducer.actions;
export default userReducer.reducer;
