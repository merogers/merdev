import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

const API_URL = `${import.meta.env.VITE_SERVER_URL}/api/email`;

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// --- Get Latest Projects --- //

export const sendMail = createAsyncThunk(
  'latestProjects/getLatestProjects',
  async (_, thunkAPI) => {
    try {
      const response = await axios.post(API_URL);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const mailSlice = createSlice({
  name: 'mail',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // --- GetLatestProjects --- //
      .addCase(sendMail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendMail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.latestProjects = action.payload;
      })
      .addCase(sendMail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = mailSlice.actions;

export default mailSlice.reducer;
