import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core';

import { setWidgetDataFromFirestoreThunk } from './features/widgetsSlice';
import { setUserSettingsFromFirestoreThunk } from './features/userSettingsSlice';
import SideBar from './common/SideBar';
import MainContent from './common/MainContent';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    height: '100%',
  },
}));
function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setWidgetDataFromFirestoreThunk());
    dispatch(setUserSettingsFromFirestoreThunk());
  });

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <SideBar />
        <MainContent />
      </div>
    </BrowserRouter>
  );
}

export default App;
