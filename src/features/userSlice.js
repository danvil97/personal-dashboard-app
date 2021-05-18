import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('monoview-user')) || {
  uid: null,
  userName: null,
  userPicture: null,
  isLogged: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.userName = action.payload.userName;
      state.userPicture = action.payload.userPicture;
      state.uid = action.payload.uid;
      state.isLogged = true;

      localStorage.setItem(
        'monoview-user',
        JSON.stringify({
          isLogged: true,
          userName: action.payload.userName,
          userPicture: action.payload.userPicture,
          uid: action.payload.uid,
        })
      );
    },
    setUserLogOut: (state) => {
      state.userName = null;
      state.userPicture = null;
      state.uid = null;
      state.isLogged = false;

      localStorage.removeItem('monoview-user');
    },
  },
});

export const { setActiveUser, setUserLogOut } = userSlice.actions;

export const selectActiveUser = (state) => state.user;
export const selectIsLogged = (state) => state.user.isLogged;
export const selectUserId = (state) => state.user.uid;

export default userSlice.reducer;
