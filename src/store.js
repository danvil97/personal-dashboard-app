import { configureStore } from '@reduxjs/toolkit';
import appReducer from './features/appSlice';
import userReducer from './features/userSlice';
import weatherReducer from './features/weatherSlice';

const store = configureStore({
  reducer: {
    appSettings: appReducer,
    user: userReducer,
    weatherAPI: weatherReducer,
  },
});

export default store;
