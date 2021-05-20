import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core';

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
