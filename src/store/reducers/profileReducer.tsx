import { IProfileState } from '../../types/interfaces';
import { createSlice } from '@reduxjs/toolkit';

const profileReducer = createSlice({
  name: 'profile',
  initialState: {
    address: {
      street: {
        value: '',
        error: '',
        isChecked: false,
      },
    },
    bio: {},
    email: {},
    passwoord: {},
  },
  reducers: {
    changeAddress(state, action) {
      // {nameInput: valueInput, nameInput: valueInput, nameInput: valueInput}
      state.address = { ...state.address, ...action.payload };
    },
    changeBio(state, action) {
      state.bio = action.payload;
    },
    changeEmail(state, action) {
      state.email = action.payload;
    },
    changePassword(state, action) {
      state.passwoord = action.payload;
    },
  },
});

export const { changeAddress, changeBio, changeEmail, changePassword } =
  profileReducer.actions;
export default profileReducer.reducer;
