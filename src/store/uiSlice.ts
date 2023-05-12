import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    darkMode: true,
    showInfo: false,
    infoMessage: '',
    color: 'blue',
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    showInfo: (state, action) => {
      state.showInfo = true;
      state.infoMessage = action.payload.message;
      state.color = action.payload.color;
    },
    hideInfo: (state) => {
      state.showInfo = false;
      state.infoMessage = '';
    },
  },
});

export const { toggleDarkMode, showInfo, hideInfo } = uiSlice.actions;
