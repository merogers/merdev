import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import server from '../../axios/server';

const initialState = {
  latestProjects: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// --- Get Latest Projects --- //

export const getLatestProjects = createAsyncThunk('latestProjects/getLatestProjects', async (_, thunkAPI) => {
  try {
    const response = await server.get('/api/projects/latest');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const latestProjectSlice = createSlice({
  name: 'latestProjects',
  initialState,
  reducers: {
    reset: () => initialState,
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
