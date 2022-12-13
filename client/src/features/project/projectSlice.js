import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import projectService from './projectService';

const initialState = {
  userProjects: [],
  latestProjects: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

const handleErrorMsg = (error) => {
  return (
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString()
  );
};

// Create new Project
export const createProject = createAsyncThunk(
  'projects/create',
  async (projectData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      console.log('project slice', projectData);
      return await projectService.createProject(projectData, token);
    } catch (error) {
      handleErrorMsg(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get projects
export const getProjects = createAsyncThunk(
  'projects/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await projectService.getProjects(token);
    } catch (error) {
      handleErrorMsg(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Latestprojects
export const getLatestProjects = createAsyncThunk(
  'projects/getLatest',
  async (_, thunkAPI) => {
    try {
      return await projectService.getLatestProjects();
    } catch (error) {
      handleErrorMsg(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete Project
export const deleteProject = createAsyncThunk(
  'projects/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await projectService.deleteProject(id, token);
    } catch (error) {
      handleErrorMsg(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userProjects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userPprojects = action.payload;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

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
      })

      .addCase(deleteProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects = state.projects.filter((project) => {
          project._id !== action.payload.id;
        });
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = projectSlice.actions;

export default projectSlice.reducer;
