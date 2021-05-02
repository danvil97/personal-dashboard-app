import { configureStore } from '@reduxjs/toolkit';
import appReducer from './features/appSlice';
import userReducer from './features/userSlice';

export default configureStore({
  reducer: {
    appSettings: appReducer,
    user: userReducer,
  },
});
