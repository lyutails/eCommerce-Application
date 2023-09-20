import { createSlice } from '@reduxjs/toolkit';
const language = localStorage.getItem('isAuth');
let isAuth;
language && language === 'true' ? (isAuth = true) : (isAuth = false);
const userReducer = createSlice({
  name: 'user',
  initialState: {
    isAuth,
    customerId: localStorage.getItem('customerId'),
    refreshToken: localStorage.getItem('refreshToken'),
  },
  reducers: {
    createCustomerId(state, action) {
      state.customerId = action.payload;
    },
    setAuthStatus(state, action) {
      state.isAuth = action.payload;
    },
    setRefreshTokenStatus(state, action) {
      state.refreshToken = action.payload;
    },
  },
});

export const { setAuthStatus, createCustomerId, setRefreshTokenStatus } =
  userReducer.actions;
export default userReducer.reducer;
