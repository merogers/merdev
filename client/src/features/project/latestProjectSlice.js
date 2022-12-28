import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

const API_URL = `${import.meta.env.VITE_SERVER_URL}/api/projects`;

const initialState = {
  latestProjects: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// --- Get Latest Projects --- //

export const getLatestProjects = createAsyncThunk(
  'latestProjects/getLatestProjects',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL + '/latest');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const latestProjectSlice = createSlice({
  name: 'latestProjects',
  initialState,
  reducers: {
    reset: (_state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // --- GetLatestProjects --- //
      .addCase(getLatestProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLatestProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.latestProjects = action.payload;
      })
      .addCase(getLatestProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = latestProjectSlice.actions;

export default latestProjectSlice.reducer;
