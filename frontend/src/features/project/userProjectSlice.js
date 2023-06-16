import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import server from '../../axios/server';

const initialState = {
  userProjects: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isUpdateSuccess: false,
  isCreateSuccess: false,
  isDeleteSuccess: false,
  message: '',
};

// --- Create new User Project --- //

export const createUserProject = createAsyncThunk(
  'projects/create',
  async (projectData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await server.post('/api/projects', projectData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// --- Update User Project --- //

export const updateUserProject = createAsyncThunk(
  'projects/update',
  async (projectData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await server.patch(
        `/api/projects/${projectData._id}`,
        projectData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// --- Get User Projects --- //

export const getUserProjects = createAsyncThunk(
  'projects/getUser',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await server.get('/api/projects', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// --- Delete User Project --- //

export const deleteUserProject = createAsyncThunk(
  'projects/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await server.delete(`/api/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userProjectSlice = createSlice({
  name: 'userProjects',
  initialState,
  reducers: {
    reset: (_state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // --- CreateUserProject --- //
      .addCase(createUserProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUserProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isCreateSuccess = true;
        state.userProjects.unshift(action.payload);
      })
      .addCase(createUserProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // --- GetUserProjects --- //
      .addCase(getUserProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userProjects = action.payload;
      })
      .addCase(getUserProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // --- DeleteUserProject --- //
      .addCase(deleteUserProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isDeleteSuccess = true;
        state.userProjects = state.userProjects.filter(
          (project) => project._id !== action.payload.id
        );
      })
      .addCase(deleteUserProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // --- UpdateUserProject --- //
      .addCase(updateUserProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isUpdateSuccess = true;
        state.userProjects = state.userProjects.map((project) => {
          if (project._id === action.payload._id) {
            return action.payload;
          }
          return project;
        });
      })
      .addCase(updateUserProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = userProjectSlice.actions;

export default userProjectSlice.reducer;
