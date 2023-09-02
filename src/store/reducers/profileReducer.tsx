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
      building: {
        value: '',
        error: '',
        isChecked: false,
      },
      apartment: {
        value: '',
        error: '',
        isChecked: false,
      },
      city: {
        value: '',
        error: '',
        isChecked: false,
      },
      country: {
        value: '',
        error: '',
        isChecked: false,
      },
      postal: {
        value: '',
        error: '',
        isChecked: false,
      },
      defaultShipping: false,
      defaultBilling: false,
      shippingAddress: false,
      billingAddress: false,
      isUpdate: false,
      isAdd: false,
      idAddress: '',
      addressStore: [],
      defaultShippingId: '',
      defaultBillingId: '',
      shippingAddressesId: [],
      billingAddressesId: [],
    },
    bio: {},
    email: {},
    passwoord: {},
    version: 1,
  },
  reducers: {
    changeAddress(state, action) {
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
    changeVersion(state, action) {
      state.version = action.payload;
    },
  },
});

export const {
  changeAddress,
  changeBio,
  changeEmail,
  changePassword,
  changeVersion,
} = profileReducer.actions;
export default profileReducer.reducer;
