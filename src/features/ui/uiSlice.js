import { createSlice } from '@reduxjs/toolkit';

const getStoredTheme = () => {
  const stored = localStorage.getItem('sajag_theme_mode');
  return stored || 'dark';
};

const getStoredLanguage = () => {
  const stored = localStorage.getItem('sajag_language');
  return stored || 'en';
};

const initialState = {
  themeMode: getStoredTheme(),
  language: getStoredLanguage(),
  sidebarOpen: false,
  loading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setThemeMode: (state, action) => {
      state.themeMode = action.payload;
      localStorage.setItem('sajag_theme_mode', action.payload);
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
      localStorage.setItem('sajag_language', action.payload);
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setThemeMode,
  setLanguage,
  toggleSidebar,
  setSidebarOpen,
  setLoading,
} = uiSlice.actions;

export const selectThemeMode = (state) => state.ui.themeMode;
export const selectLanguage = (state) => state.ui.language;
export const selectSidebarOpen = (state) => state.ui.sidebarOpen;
export const selectLoading = (state) => state.ui.loading;

export default uiSlice.reducer;
