import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addedWidgets: [],
  isLoading: false,
};

const widgetSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    addWidget: (state, action) => {
      state.addedWidgets = [...state.addedWidgets, action.payload];
    },
    updateWidgetGridSettings: (state, action) => {
      state.addedWidgets = state.addedWidgets.map((widget) => ({
        ...widget,
        gridSettings: {
          ...widget.gridSettings,
          ...action.payload.find(({ i }) => widget.id === i),
        },
      }));
    },
  },
});

export const { addWidget, updateWidgetGridSettings } = widgetSlice.actions;

export const selectWidgets = (state) => state.widgets.addedWidgets;
export const selectWidgetsStatus = (state) => state.widgets.isLoading;

export default widgetSlice.reducer;
