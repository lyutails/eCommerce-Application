import { createSlice } from '@reduxjs/toolkit';

const cartReducer = createSlice({
  name: 'cart',
  initialState: {
    anonymousCart: {
      anonymousID: localStorage.getItem('anonymousID'),
      versionAnonCart: 1,
      cartID: '',
      anonymousRefreshToken: localStorage.getItem('refreshAnonToken'),
      anonymousAccessToken: '',
    },
    discountCodes: [],
    userCart: {
      userCartId: '',
      versionUserCart: 1,
    },
    cartItems: [],
  },
  reducers: {
    changeAnonymousCart(state, action) {
      state.anonymousCart = { ...state.anonymousCart, ...action.payload };
    },
    changeUserCart(state, action) {
      state.userCart = { ...state.userCart, ...action.payload };
    },
    setDiscountCodes(state, action) {
      state.discountCodes = action.payload;
    },
    setCartItems(state, action) {
      state.cartItems = action.payload;
    },
  },
});

export const {
  changeAnonymousCart,
  changeUserCart,
  setDiscountCodes,
  setCartItems,
} = cartReducer.actions;

export default cartReducer.reducer;
