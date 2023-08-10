import { IApiState } from '../../types/interfaces';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IApiState = {
  currentCategory: [],
};

const categoryReducer = createSlice({
  name: 'category',
  initialState,
  reducers: {
    creationCategory(state, action) {
      state.currentCategory = [...state.currentCategory, ...action.payload];
    },
  },
});

export const { creationCategory } = categoryReducer.actions;
export default categoryReducer.reducer;
