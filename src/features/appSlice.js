import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sideBar: { isOpen: true },
};

const appSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {
    toggleSideBarOpen: (state) => {
      state.sideBar.isOpen = !state.sideBar.isOpen;
    },
  },
});

export const selectSideBarSettings = (state) => state.appSettings.sideBar;

export const { toggleSideBarOpen } = appSlice.actions;
export default appSlice.reducer;
