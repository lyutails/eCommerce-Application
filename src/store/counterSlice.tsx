import { createSlice } from '@reduxjs/toolkit';

// Начальное значение
// const initialState = {
//   image: '',
// };

const counterSlice = createSlice({
  name: 'api',
  initialState: {
    image: '',
  },
  // Редьюсеры в слайсах мутируют состояние и ничего не возвращают наружу
  reducers: {
    setImage: (state, action) => {
      state.image = action.payload;
    },
  },
});

export const { setImage } = counterSlice.actions;

// По умолчанию экспортируется редьюсер, сгенерированный слайсом
export default counterSlice.reducer;
