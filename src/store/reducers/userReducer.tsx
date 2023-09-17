import { createSlice } from '@reduxjs/toolkit';
const local = localStorage.getItem('isAuth');
const userReducer = createSlice({
  name: 'user',
  initialState: {
    isAuth: local && local === 'true' ? true : false,
    customerId: localStorage.getItem('customerId'),
    customerRefreshToken: localStorage.getItem('refreshToken'),
    accessToken: '',
  },
  reducers: {
    createCustomerId(state, action) {
      state.customerId = action.payload;
    },
    setAuthStatus(state, action) {
      state.isAuth = action.payload;
    },
    setRefreshTokenStatus(state, action) {
      state.customerRefreshToken = action.payload;
    },
    setAccessTokenStatus(state, action) {
      state.accessToken = action.payload;
    },
  },
});

export const {
  setAuthStatus,
  createCustomerId,
  setRefreshTokenStatus,
  setAccessTokenStatus,
} = userReducer.actions;
export default userReducer.reducer;
