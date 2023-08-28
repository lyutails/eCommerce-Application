import { createSlice } from '@reduxjs/toolkit';
const clickedPersonal = localStorage.getItem('clickedPersonal');
const clickedAddress = localStorage.getItem('clickedAddress');
let information, addresses;
clickedPersonal && clickedPersonal === 'true'
  ? (information = true)
  : (information = false);
clickedAddress && clickedAddress === 'true'
  ? (addresses = true)
  : (addresses = false);
const personalReducer = createSlice({
  name: 'personal',
  initialState: {
    information,
    addresses,
  },
  reducers: {
    changeStatusPersonal(state, action) {
      state.information = action.payload;
    },
    changeStatusAddress(state, action) {
      state.addresses = action.payload;
    },
  },
});

export const { changeStatusPersonal, changeStatusAddress } =
  personalReducer.actions;
export default personalReducer.reducer;
