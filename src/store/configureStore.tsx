import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import categoryReducer from './reducers/categoryReducer';

export default configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
  },
});
