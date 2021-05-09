import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sideBar: { isOpen: false },
  settingsModal: { isOpen: false },
};

const appSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {
    toggleSideBarOpen: (state) => {
      state.sideBar.isOpen = !state.sideBar.isOpen;
    },
    openSettingsModal: (state) => {
      state.settingsModal.isOpen = true;
    },
    closeSettingsModal: (state) => {
      state.settingsModal.isOpen = false;
    },
  },
});

export const selectSideBarSettings = (state) => state.appSettings.sideBar;
export const selectSettingsModalSettings = (state) => state.appSettings.settingsModal;

export const { toggleSideBarOpen, openSettingsModal, closeSettingsModal } = appSlice.actions;
export default appSlice.reducer;
