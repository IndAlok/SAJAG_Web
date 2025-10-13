import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import trainingsReducer from '../features/trainings/trainingsSlice';
import uiReducer from '../features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    trainings: trainingsReducer,
    ui: uiReducer,
  },
});

export default store;
