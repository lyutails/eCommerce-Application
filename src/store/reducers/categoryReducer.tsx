import { ICategoryState } from '../../types/interfaces';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ICategoryState = {
  category: {
    category: [],
  },
};

const categoryReducer = createSlice({
  name: 'category',
  initialState,
  reducers: {
    createCategory(state, action) {
      state.category = action.payload;
    },
  },
});

export const { createCategory } = categoryReducer.actions;
export default categoryReducer.reducer;
