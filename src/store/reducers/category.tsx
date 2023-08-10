import { createSlice } from '@reduxjs/toolkit';
import { SET_CATEGORY } from '../../constants';

interface IApiState {
  currentCategory: (typeof SET_CATEGORY)[];
}

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
