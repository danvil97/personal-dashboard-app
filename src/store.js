import { configureStore } from '@reduxjs/toolkit';
import appReducer from './features/appSlice';
import userReducer from './features/userSlice';
import weatherReducer from './features/weatherSlice';
import widgetsReducer from './features/widgetsSlice';

const store = configureStore({
  reducer: {
    appSettings: appReducer,
    user: userReducer,
    weatherAPI: weatherReducer,
    widgets: widgetsReducer,
  },
});

export default store;
