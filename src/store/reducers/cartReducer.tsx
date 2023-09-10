import { createSlice } from '@reduxjs/toolkit';

const cartReducer = createSlice({
  name: 'cart',
  initialState: {
    anonymousID: '',
    versionCart: 1,
    cartID: '',
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
  },
});

export const { changeAnonymousID, changeVersionCart, changeCartID } =
  cartReducer.actions;

export default cartReducer.reducer;
