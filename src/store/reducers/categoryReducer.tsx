import { createSlice } from '@reduxjs/toolkit';

import { ICategoryState } from '../../types/interfaces';

const initialState: ICategoryState = {
  category: [],
};

const categoryReducer = createSlice({
  name: 'category',
  initialState,
  reducers: {
    createCategory(state, action) {
      state.category = [...state.category, ...action.payload];
    },
  },
});

export const { createCategory } = categoryReducer.actions;
export default categoryReducer.reducer;
