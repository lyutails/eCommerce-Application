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
    userCart: {
      userCartId: '',
      versionUserCart: 1,
    },
    discountCodes: [],
    promocode: '',
    cartItems: [],
    cartPrice: 0,
    cartPriceDiscount: 0,
    cartQuantity: 0,
    discountCodesCart: [],
    isClickedButton: false,
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
    setCartPrice(state, action) {
      state.cartPrice = action.payload;
    },
    setCartPriceDiscount(state, action) {
      state.cartPriceDiscount = action.payload;
    },
    setCartQuantity(state, action) {
      state.cartQuantity = action.payload;
    },
    setPromocode(state, action) {
      state.promocode = action.payload;
    },
    setDiscountCodesCart(state, action) {
      state.discountCodesCart = action.payload;
    },
    setIsClickedButton(state, action) {
      state.isClickedButton = action.payload;
    },
  },
});

export const {
  changeAnonymousCart,
  changeUserCart,
  setDiscountCodes,
  setCartItems,
  setCartPrice,
  setCartQuantity,
  setPromocode,
  setCartPriceDiscount,
  setDiscountCodesCart,
  setIsClickedButton,
} = cartReducer.actions;

export default cartReducer.reducer;
