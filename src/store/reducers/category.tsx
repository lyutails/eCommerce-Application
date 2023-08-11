import { ICategoryState } from '../../types/interfaces';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ICategoryState = {
  category: [],
};

const categoryReducer = createSlice({
  name: 'category',
  initialState,
  reducers: {
    creationCategory(state, action) {
      state.category = [...state.category, ...action.payload];
    },
  },
});

export const { creationCategory } = categoryReducer.actions;
export default categoryReducer.reducer;
