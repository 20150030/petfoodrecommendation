import { configureStore } from '@reduxjs/toolkit';
import petReducer from './slices/petSlice';
import foodReducer from './slices/foodSlice';

export const store = configureStore({
  reducer: {
    pet: petReducer,
    food: foodReducer,
  },
});