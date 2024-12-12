import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRecommendations } from '../../services/api';

export const fetchRecommendations = createAsyncThunk(
  'food/fetchRecommendations',
  async (petInfo, { rejectWithValue }) => {
    try {
      const response = await getRecommendations(petInfo);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  recommendations: [],
  loading: false,
  error: null,
};

export const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        state.recommendations = action.payload;
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default foodSlice.reducer;