import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import categoryReducer from './reducers/categoryReducer';
import personalReducer from './reducers/personalReducer';
import profileReducer from './reducers/profileReducer';
import productReducer from './reducers/productReduser';
import cartReducer from './reducers/cartReducer';
import registrationReducer from './reducers/registrationReducer';

export default configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    personal: personalReducer,
    profile: profileReducer,
    product: productReducer,
    cart: cartReducer,
    registration: registrationReducer,
  },
});
