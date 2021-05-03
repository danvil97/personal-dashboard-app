import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const widgetSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {},
});

export const { s } = widgetSlice.actions;
export default widgetSlice.reducer;
