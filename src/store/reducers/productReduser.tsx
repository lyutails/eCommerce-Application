import { createSlice } from '@reduxjs/toolkit';

const productReducer = createSlice({
  name: 'product',
  initialState: {
    productImg: [],
    flagInModalWindow: false,
  },
  reducers: {
    createProductImgArr(state, action) {
      state.productImg = action.payload;
    },
    changeflagInModalWindow(state, action) {
      state.flagInModalWindow = action.payload;
    },
  },
});

export const { createProductImgArr, changeflagInModalWindow } =
  productReducer.actions;
export default productReducer.reducer;
