import { createSlice } from '@reduxjs/toolkit';
import { db } from '../firebase';

const initialState = {
  addedWidgets: [],
  isLoading: false,
};

const widgetSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    //! Firestore sync
    setWidgetDataFromFirestore: (state) => {
      state.isLoading = true;
    },
    setWidgetDataFromFirestoreSuccess: (state, action) => {
      state.addedWidgets = action.payload.addedWidgets;
      state.isLoading = false;
    },
    setWidgetDataFromFirestoreFailure: (state) => {
      state.isLoading = false;
    },
    //! common widget actions
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
    //! todo widget actions
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
    //! pomodoro widget actions
    changePomodoroSettings: (state, action) => {
      const { id } = action.payload;
      const currentWidget = state.addedWidgets.find((widget) => widget.id === id);

      currentWidget.settings = { ...currentWidget.settings, ...action.payload.updatedSettings };
    },
    changePomodoroTimers: (state, action) => {
      const { id } = action.payload;
      const currentWidget = state.addedWidgets.find((widget) => widget.id === id);

      currentWidget.settings.timers = {
        ...currentWidget.settings.timers,
        ...action.payload.updatedTimers,
      };
    },
    changePomodoroCount: (state, action) => {
      const { id } = action.payload;
      const currentWidget = state.addedWidgets.find((widget) => widget.id === id);

      currentWidget.settings.pomodoroCount = action.payload.newPomodoroCount;
    },
    //! Quick links
    addQuickLink: (state, action) => {
      const { id, newLink } = action.payload;
      const currentWidget = state.addedWidgets.find((widget) => widget.id === id);

      currentWidget.links.push({ ...newLink });
    },
    removeQuickLink: (state, action) => {
      const { id, linkId } = action.payload;
      const currentWidget = state.addedWidgets.find((widget) => widget.id === id);

      currentWidget.links = currentWidget.links.filter((link) => link.id !== linkId);
    },
  },
});

export const {
  setWidgetDataFromFirestore,
  setWidgetDataFromFirestoreSuccess,
  setWidgetDataFromFirestoreFailure,
  addWidget,
  updateWidgetGridSettings,
  updateWidget,
  removeWidget,
  addTodo,
  removeTodo,
  toggleTodo,
  changePomodoroSettings,
  changePomodoroTimers,
  changePomodoroCount,
  addQuickLink,
  removeQuickLink,
} = widgetSlice.actions;

export const selectWidgets = (state) => state.widgets.addedWidgets;
export const selectWidgetsStatus = (state) => state.widgets.isLoading;

export function setWidgetDataFromFirestoreThunk() {
  return (dispatch, getState) => {
    const { uid } = getState().user;
    dispatch(setWidgetDataFromFirestore());
    const userRef = db.collection('users').doc(uid);
    console.log(uid);
    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log(doc.data());
          dispatch(
            setWidgetDataFromFirestoreSuccess({
              addedWidgets: doc.data().addedWidgets.map((widget) => JSON.parse(widget)),
            })
          );
        } else {
          dispatch(setWidgetDataFromFirestoreFailure());
        }
      })
      .catch((err) => {
        console.log(err);

        dispatch(setWidgetDataFromFirestoreFailure());
      });
  };
}

export default widgetSlice.reducer;
