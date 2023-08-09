import { SET_CATEGORY } from '../constants';

export interface Action<T, P> {
  type: T;
  payload?: P;
}

export function createAction<T extends string, P>(
  type: T,
  payload: P
): Action<T, P> {
  return { type, payload };
}
const action = createAction;

const initialState = {
  currentCategory: [],
};

// const category = (initialState, { action: PayloadAction<T> }) => {
//   switch (type) {
//     case SET_CATEGORY:
//       return {
//         ...state,
//         currentCategory: [...state.currentCategory, ...payload],
//       };
//   }
// };
