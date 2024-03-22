import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './features/modalSlice';
import menuReducer from './features/menuSlice';
import { projectApi } from './services/projectApi';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    menu: menuReducer,
    [projectApi.reducerPath]: projectApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(projectApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
