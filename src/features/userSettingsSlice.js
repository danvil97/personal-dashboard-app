import { createSlice } from '@reduxjs/toolkit';
import { db } from '../firebase';
import { showNotification } from './notificationSlice';

const initialState = {
  settings: {
    timeFormat: 24,
    dateFormat: 'DD-MM-YY',
    showDate: true,
    showTime: true,
    showDay: false,
    language: 'ENG',
  },
  isLoading: false,
};

const userSettingsSlice = createSlice({
  name: 'userSettings',
  initialState,
  reducers: {
    //! Firestore sync
    setUserSettingsFromFirestore: (state) => {
      state.isLoading = true;
    },
    setUserSettingsFromFirestoreSuccess: (state, action) => {
      state.settings = action.payload.settings;
      state.isLoading = false;
    },
    setUserSettingsFromFirestoreFailure: (state) => {
      state.isLoading = false;
    },
    sendUserSettingsToFirestore: (state) => {
      state.isLoading = true;
    },
    sendUserSettingsToFirestoreSuccess: (state, action) => {
      state.isLoading = false;
      state.settings = action.payload.settings;
    },
    sendUserSettingsToFirestoreFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  setUserSettingsFromFirestore,
  setUserSettingsFromFirestoreSuccess,
  setUserSettingsFromFirestoreFailure,
  sendUserSettingsToFirestore,
  sendUserSettingsToFirestoreSuccess,
  sendUserSettingsToFirestoreFailure,
} = userSettingsSlice.actions;

export const selectUserSettings = (state) => state.userSettings.settings;

export function setUserSettingsFromFirestoreThunk() {
  return (dispatch, getState) => {
    const { uid } = getState().user;
    dispatch(setUserSettingsFromFirestore());
    const userRef = db.collection('users').doc(uid);
    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          dispatch(
            setUserSettingsFromFirestoreSuccess({
              settings: doc.data().settings,
            })
          );
        } else {
          dispatch(setUserSettingsFromFirestoreFailure());
          dispatch(showNotification({ message: 'Settings successfully loaded', type: 'success' }));
        }
      })
      .catch(() => {
        dispatch(setUserSettingsFromFirestoreFailure());
        dispatch(showNotification({ message: 'Error while getting settings', type: 'error' }));
      });
  };
}
export function sendUserSettingsToFirestoreThunk({ settings }) {
  return (dispatch, getState) => {
    const { uid } = getState().user;
    dispatch(sendUserSettingsToFirestore());

    const userRef = db.collection('users').doc(uid);

    userRef
      .update({
        settings,
      })
      .then(() => {
        dispatch(sendUserSettingsToFirestoreSuccess({ settings }));
        dispatch(showNotification({ message: 'Settings successfully saved', type: 'success' }));
      })
      .catch(() => {
        dispatch(sendUserSettingsToFirestoreFailure());
        dispatch(showNotification({ message: 'Error while saving settings', type: 'error' }));
      });
  };
}

export default userSettingsSlice.reducer;
