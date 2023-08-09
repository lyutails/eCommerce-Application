import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counterSlice';

export default configureStore({
  reducer: {
    // свойство counter будет внутри объекта общего состояния: state.counter
    email: counterSlice,
    name: counterSlice,
    lastname: counterSlice,
  },
});