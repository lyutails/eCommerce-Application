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
    bio: {
      firstname: {
        value: '',
        error: '',
        isChecked: false,
      },
      lastname: {
        value: '',
        error: '',
        isChecked: false,
      },
      birthday: {
        value: '',
        error: '',
        isChecked: false,
      },
    },
    email: {
      value: '',
      error: '',
      isChecked: false,
    },
    password: {
      currentPassword: {
        value: '',
        error: false,
        isChecked: false,
      },
      newPassword: {
        value: '',
        error: false,
        isChecked: false,
      },
      repeatePassword: {
        value: '',
        error: false,
        isChecked: false,
      },
    },
    version: 1,
  },
  reducers: {
    changeAddress(state, action) {
      state.address = { ...state.address, ...action.payload };
    },
    changeBio(state, action) {
      state.bio = { ...state.bio, ...action.payload };
    },
    changeEmail(state, action) {
      state.email = { ...state.email, ...action.payload };
    },
    changePassword(state, action) {
      state.password = { ...state.password, ...action.payload };
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
