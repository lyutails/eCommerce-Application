import { createSlice } from '@reduxjs/toolkit';

const cartReducer = createSlice({
  name: 'cart',
  initialState: {
    anonymousID: '',
    versionCart: 1,
    cartID: '',
    anonymousRefreshToken: '',
    anonymousAccessToken: '',
  },
  reducers: {
    changeAnonymousID(state, action) {
      state.anonymousID = action.payload;
    },
    changeVersionCart(state, action) {
      state.versionCart = action.payload;
    },
    changeCartID(state, action) {
      state.cartID = action.payload;
    },
    changeAnonymousRefreshToken(state, action) {
      state.anonymousRefreshToken = action.payload;
    },
    changeAnonymousAccessToken(state, action) {
      state.anonymousAccessToken = action.payload;
    },
  },
});

export const {
  changeAnonymousID,
  changeVersionCart,
  changeCartID,
  changeAnonymousRefreshToken,
  changeAnonymousAccessToken,
} = cartReducer.actions;

export default cartReducer.reducer;
