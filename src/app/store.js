import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import trainingsReducer from '../features/trainings/trainingsSlice';
import partnersReducer from '../features/partners/partnersSlice';
import analyticsReducer from '../features/analytics/analyticsSlice';
import uiReducer from '../features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    trainings: trainingsReducer,
    partners: partnersReducer,
    analytics: analyticsReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/restoreSession/fulfilled'],
      },
    }),
});

export default store;
