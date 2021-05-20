import { createSlice } from '@reduxjs/toolkit';
import { db } from '../firebase';
import { showNotification } from './notificationSlice';

const initialState = {
  addedWidgets: [],
  isModified: false,
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
      state.isModified = false;
    },
    setWidgetDataFromFirestoreFailure: (state) => {
      state.isLoading = false;
    },
    sendWidgetDataToFirestore: (state) => {
      state.isLoading = true;
    },
    sendWidgetDataToFirestoreSuccess: (state) => {
      state.isLoading = false;
      state.isModified = false;
    },
    sendWidgetDataToFirestoreFailure: (state) => {
      state.isLoading = false;
    },
    //! common widget actions
    addWidget: (state, action) => {
      state.addedWidgets = [...state.addedWidgets, action.payload];
      state.isModified = true;
    },
    updateWidgetGridSettings: (state, action) => {
      state.addedWidgets = state.addedWidgets.map((widget) => ({
        ...widget,
        gridSettings: {
          ...widget.gridSettings,
          ...action.payload.find(({ i }) => widget.id === i),
        },
      }));
      state.isModified = true;
    },
    updateWidget: (state, action) => {
      state.addedWidgets = state.addedWidgets.map((widget) =>
        widget.id === action.payload.id ? { ...widget, ...action.payload } : widget
      );
      state.isModified = true;
    },
    removeWidget: (state, action) => {
      state.addedWidgets = state.addedWidgets.filter(({ id }) => id !== action.payload.id);
      state.isModified = true;
    },
    //! todo widget actions
    addTodo: (state, action) => {
      const { id, newTodo } = action.payload;
      const currentWidget = state.addedWidgets.find((widget) => widget.id === id);

      currentWidget.todoList.push({ ...newTodo });
      state.isModified = true;
    },
    toggleTodo: (state, action) => {
      const { id, todoId } = action.payload;
      const currentWidget = state.addedWidgets.find((widget) => widget.id === id);
      const currentTodo = currentWidget.todoList.find((todo) => todo.id === todoId);

      currentTodo.isCompleted = !currentTodo.isCompleted;
      state.isModified = true;
    },
    removeTodo: (state, action) => {
      const { id, todoId } = action.payload;
      const currentWidget = state.addedWidgets.find((widget) => widget.id === id);

      currentWidget.todoList = currentWidget.todoList.filter((todo) => todo.id !== todoId);
      state.isModified = true;
    },
    //! pomodoro widget actions
    changePomodoroSettings: (state, action) => {
      const { id } = action.payload;
      const currentWidget = state.addedWidgets.find((widget) => widget.id === id);

      currentWidget.settings = { ...currentWidget.settings, ...action.payload.updatedSettings };
      state.isModified = true;
    },
    changePomodoroTimers: (state, action) => {
      const { id } = action.payload;
      const currentWidget = state.addedWidgets.find((widget) => widget.id === id);

      currentWidget.settings.timers = {
        ...currentWidget.settings.timers,
        ...action.payload.updatedTimers,
      };
      state.isModified = true;
    },
    changePomodoroCount: (state, action) => {
      const { id } = action.payload;
      const currentWidget = state.addedWidgets.find((widget) => widget.id === id);

      currentWidget.settings.pomodoroCount = action.payload.newPomodoroCount;
      state.isModified = true;
    },
    //! Quick links
    addQuickLink: (state, action) => {
      const { id, newLink } = action.payload;
      const currentWidget = state.addedWidgets.find((widget) => widget.id === id);

      currentWidget.links.push({ ...newLink });
      state.isModified = true;
    },
    removeQuickLink: (state, action) => {
      const { id, linkId } = action.payload;
      const currentWidget = state.addedWidgets.find((widget) => widget.id === id);

      currentWidget.links = currentWidget.links.filter((link) => link.id !== linkId);
      state.isModified = true;
    },
  },
});

export const {
  setWidgetDataFromFirestore,
  setWidgetDataFromFirestoreSuccess,
  setWidgetDataFromFirestoreFailure,
  sendWidgetDataToFirestore,
  sendWidgetDataToFirestoreSuccess,
  sendWidgetDataToFirestoreFailure,
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
export const selectWidgetsStatus = (state) => ({
  isLoading: state.widgets.isLoading,
  isModified: state.widgets.isModified,
});

export function setWidgetDataFromFirestoreThunk() {
  return (dispatch, getState) => {
    const { uid } = getState().user;
    dispatch(setWidgetDataFromFirestore());
    const userRef = db.collection('users').doc(uid);
    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          dispatch(
            setWidgetDataFromFirestoreSuccess({
              addedWidgets: doc.data().addedWidgets.map((widget) => JSON.parse(widget)),
            })
          );
          dispatch(
            showNotification({ message: 'Widget layout successfully loaded', type: 'success' })
          );
        } else {
          dispatch(setWidgetDataFromFirestoreFailure());
          dispatch(
            showNotification({
              message: 'Error while loading widget layout: No user',
              type: 'error',
            })
          );
        }
      })
      .catch(() => {
        dispatch(setWidgetDataFromFirestoreFailure());
        dispatch(showNotification({ message: 'Error while loading widget layout', type: 'error' }));
      });
  };
}
export function sendWidgetDataToFirestoreThunk() {
  return (dispatch, getState) => {
    const { uid } = getState().user;
    const { addedWidgets } = getState().widgets;
    dispatch(sendWidgetDataToFirestore());

    const userRef = db.collection('users').doc(uid);

    userRef
      .update({
        addedWidgets: addedWidgets.map((widget) => JSON.stringify(widget)),
      })
      .then(() => {
        dispatch(sendWidgetDataToFirestoreSuccess());
        dispatch(
          showNotification({ message: 'Widget layout successfully synced', type: 'success' })
        );
      })
      .catch(() => {
        dispatch(sendWidgetDataToFirestoreFailure());
        dispatch(showNotification({ message: 'Error while sending widget layout', type: 'error' }));
      });
  };
}

export default widgetSlice.reducer;
