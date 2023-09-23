import { createSlice } from '@reduxjs/toolkit';

const registrationReducer = createSlice({
  name: 'registration',
  initialState: {
    addressShip: {
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
    addressBill: {
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
      email: {
        value: '',
        error: '',
        isChecked: false,
      },
    },

    password: {
      currentPassword: {
        value: '',
        error: false,
        isChecked: false,
      },
    },
    version: 1,
  },
  reducers: {
    changeAddressShipReg(state, action) {
      state.addressShip = { ...state.addressShip, ...action.payload };
    },
    changeAddressBillReg(state, action) {
      state.addressBill = { ...state.addressBill, ...action.payload };
    },
    changeBioReg(state, action) {
      // const keys = Object.keys(action.payload);
      // const result = keys.map((key) => {
      //   return {
      //     [key]: {
      //       ...state.bio,
      //       ...action.payload[key],
      //     },
      //   };
      // });
      state.bio = { ...state.bio, ...action.payload };
    },
    changePasswordReg(state, action) {
      state.password = { ...state.password, ...action.payload };
    },
    changeVersionReg(state, action) {
      state.version = action.payload;
    },
  },
});

export const {
  changeAddressShipReg,
  changeAddressBillReg,
  changeBioReg,
  changePasswordReg,
  changeVersionReg,
} = registrationReducer.actions;
export default registrationReducer.reducer;
