import { configureStore } from '@reduxjs/toolkit';
import appReducer from './features/appSlice';
import userReducer from './features/userSlice';

const store = configureStore({
  reducer: {
    appSettings: appReducer,
    user: userReducer,
  },
});

export default store;
