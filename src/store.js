import { configureStore } from '@reduxjs/toolkit';

import appReducer from './features/appSlice';
import notificationSlice from './features/notificationSlice';
import userSettingsSlice from './features/userSettingsSlice';
import userReducer from './features/userSlice';
import widgetsReducer from './features/widgetsSlice';

const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    widgets: widgetsReducer,
    userSettings: userSettingsSlice,
    notification: notificationSlice,
  },
});

export default store;
