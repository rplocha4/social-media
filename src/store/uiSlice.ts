import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    showNotification: false,
    notificationMessage: '',
  },
  reducers: {
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

export const { showNotification, hideNotification } = uiSlice.actions;
