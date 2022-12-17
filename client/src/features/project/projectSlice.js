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
      return await projectService.createProject(projectData, token);
    } catch (error) {
      handleErrorMsg(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create new Project
export const updateProject = createAsyncThunk(
  'projects/update',
  async (projectData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await projectService.updateProject(projectData, token);
    } catch (error) {
      handleErrorMsg(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get projects
export const getUserProjects = createAsyncThunk(
  'projects/getUser',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await projectService.getUserProjects(token);
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
        state.userProjects.unshift(action.payload);
        state.latestProjects.unshift(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

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
        state.userProjects = state.userProjects.filter((project) => {
          project._id !== action.payload.id;
        });
        state.latestProjects = state.latestProjects.filter((project) => {
          project._id !== action.payload.id;
        });
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userProjects = [
          action.payload,
          ...state.userProjects.filter(
            (project) => project._id !== action.payload.id
          ),
        ];
        state.latestProjects = [
          action.payload,
          ...state.latestProjects.filter(
            (project) => project._id !== action.payload.id
          ),
        ];
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = projectSlice.actions;

export default projectSlice.reducer;
