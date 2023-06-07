import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    darkMode: true,
    showInfo: false,
    infoMessage: '',
    color: 'blue',
    showNotification: false,
    notificationMessage: '',
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
      state.color = 'blue';
    },
    showNotification: (state, action) => {
      state.showNotification = true;
      state.notificationMessage = action.payload.message;
    },
    hideNotification: (state) => {
      state.showNotification = false;
      state.notificationMessage = '';
    },
  },
});

export const {
  toggleDarkMode,
  showInfo,
  hideInfo,
  showNotification,
  hideNotification,
} = uiSlice.actions;
