import { configureStore } from '@reduxjs/toolkit';
import useReducer from './reducers/userReducer';

export default configureStore({
  reducer: {
    user: useReducer,
  },
});
