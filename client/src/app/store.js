import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import latestProjectReducer from '../features/project/latestProjectSlice';
import userProjectReducer from '../features/project/userProjectSlice';

import menuReducer from '../features/menu/menuSlice';
import modalReducer from '../features/modal/modalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userProjects: userProjectReducer,
    latestProjects: latestProjectReducer,
    menu: menuReducer,
    modals: modalReducer,
  },
});
