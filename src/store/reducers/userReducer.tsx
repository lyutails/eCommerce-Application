import { createSlice } from '@reduxjs/toolkit';
const language = localStorage.getItem('isAuth');
let isAuth;
language && language === 'true' ? (isAuth = true) : (isAuth = false);
const userReducer = createSlice({
  name: 'user',
  initialState: {
    isAuth,
    customerId: '',
  },
  reducers: {
    createCustomerId(state, action) {
      state.customerId = action.payload;
    },
    setAuthStatus(state, action) {
      state.isAuth = action.payload;
    },
  },
});

export const { setAuthStatus, createCustomerId } = userReducer.actions;
export default userReducer.reducer;
