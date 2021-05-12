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
    updateWidget: (state, action) => {
      state.addedWidgets = state.addedWidgets.map((widget) =>
        widget.id === action.payload.id ? { ...widget, ...action.payload } : widget
      );
    },
    removeWidget: (state, action) => {
      state.addedWidgets = state.addedWidgets.filter(({ id }) => id !== action.payload.id);
    },
    // todo widget actions
    addTodo: (state, action) => {
      const { id, newTodo } = action.payload;
      const currentWidget = state.addedWidgets.find((widget) => widget.id === id);

      currentWidget.todoList.push({ ...newTodo });
    },
    toggleTodo: (state, action) => {
      const { id, todoId } = action.payload;
      const currentWidget = state.addedWidgets.find((widget) => widget.id === id);
      const currentTodo = currentWidget.todoList.find((todo) => todo.id === todoId);

      currentTodo.isCompleted = !currentTodo.isCompleted;
    },
    removeTodo: (state, action) => {
      const { id, todoId } = action.payload;
      const currentWidget = state.addedWidgets.find((widget) => widget.id === id);

      currentWidget.todoList = currentWidget.todoList.filter((todo) => todo.id !== todoId);
    },
  },
});

export const {
  addWidget,
  updateWidgetGridSettings,
  updateWidget,
  removeWidget,
  addTodo,
  removeTodo,
  toggleTodo,
} = widgetSlice.actions;

export const selectWidgets = (state) => state.widgets.addedWidgets;
export const selectWidgetsStatus = (state) => state.widgets.isLoading;

export default widgetSlice.reducer;
