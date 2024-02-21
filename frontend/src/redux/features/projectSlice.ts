import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialProjectState = {
  projects: [],
};

const projectSlice = createSlice({
  name: 'projects',
  initialState: initialProjectState,
  reducers: {
    reset: () => initialProjectState,
    setUserProjects: (state, action: PayloadAction<any>) => {
      state.projects = action.payload;
    },
  },
});

export const { reset, setUserProjects } = projectSlice.actions;
export default projectSlice.reducer;
