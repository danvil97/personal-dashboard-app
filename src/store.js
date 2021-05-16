import { configureStore } from '@reduxjs/toolkit';

import appReducer from './features/appSlice';
import userReducer from './features/userSlice';
import widgetsReducer from './features/widgetsSlice';

const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    widgets: widgetsReducer,
  },
});

export default store;
