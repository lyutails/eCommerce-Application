import { configureStore } from '@reduxjs/toolkit';
import useReducer from './reducers/userReducer';
import categoryReducer from './reducers/category';

export default configureStore({
  reducer: {
    user: useReducer,
  },
});
