import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'api',
  initialState: {
    image: '',
    email: '',
    name: '',
    lastname: '',
  },
  reducers: {
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setLastname: (state, action) => {
      state.lastname = action.payload;
    },
  },
});

export const { setImage } = counterSlice.actions;

export default counterSlice.reducer;
