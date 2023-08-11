import { createSlice } from '@reduxjs/toolkit';

const categoryReducer = createSlice({
  name: 'category',
  initialState: {
    category: [],
  },
  reducers: {
    // getCategory(state, action) {
    //   state.category = { ...action.payload };
    // },
    createCategory(state, action) {
      state.category = action.payload;
    },
  },
});

export const { createCategory } = categoryReducer.actions;
export default categoryReducer.reducer;
