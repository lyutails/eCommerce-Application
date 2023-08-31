import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import categoryReducer from './reducers/categoryReducer';
import personalReducer from './reducers/personalReducer';
import profileReducer from './reducers/profileReducer';

export default configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    personal: personalReducer,
    profile: profileReducer,
  },
});
