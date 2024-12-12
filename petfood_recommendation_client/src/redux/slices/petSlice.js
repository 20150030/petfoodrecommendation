import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  petInfo: null,
};

export const petSlice = createSlice({
  name: 'pet',
  initialState,
  reducers: {
    registerPet: (state, action) => {
      state.petInfo = action.payload;
    },
  },
});

export const { registerPet } = petSlice.actions;

export default petSlice.reducer;