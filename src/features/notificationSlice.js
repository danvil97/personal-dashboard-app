import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  type: 'success',
  message: '',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    hideNotification: (state) => {
      state.isOpen = false;
    },
  },
});

export const selectNotificationSettings = (state) => ({
  isOpen: state.notification.isOpen,
  type: state.notification.type,
  message: state.notification.message,
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
