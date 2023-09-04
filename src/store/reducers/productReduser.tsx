import { createSlice } from '@reduxjs/toolkit';

import { IProductState } from '../../types/interfaces';

// const initialState: IProductState = {
//   productImg: [],
// };

const productReducer = createSlice({
  name: 'product',
  initialState: {
    productImg: [],
  },
  reducers: {
    createProductImgArr(state, action) {
      state.productImg = action.payload;
    },
  },
});

export const { createProductImgArr } = productReducer.actions;
export default productReducer.reducer;
