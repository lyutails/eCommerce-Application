import { createSlice } from '@reduxjs/toolkit';

const userReducer = createSlice({
  name: 'user',
  initialState: {
    user: {
      login: '',
      password: '',
      email: '',
    },
    isAuth: false,
  },
  reducers: {
    creationUser(state, action) {
      state.user = { ...action.payload };
    },
    updateCustomer(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
    setAuthStatus(state, action) {
      state.isAuth = action.payload;
    },
  },
});

export const { creationUser, setAuthStatus } = userReducer.actions;
export default userReducer.reducer;
