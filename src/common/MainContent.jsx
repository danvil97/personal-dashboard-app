import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { get } from 'lodash';
import { makeStyles, IconButton } from '@material-ui/core';
import { RiMenuFoldLine, RiMenuUnfoldLine } from 'react-icons/ri';
import { MdAdd } from 'react-icons/md';

import { selectSideBarSettings, toggleSideBarOpen } from '../features/appSlice';

import CurrentDateWidget from '../components/widgets/CurrentDateWidget';
import PrivateRoute from './PrivateRoute';
import ToolBar from './ToolBar';

import WidgetsGrid from '../components/WidgetsGrid';

const useStyles = makeStyles(() => ({
  content: {
    flexGrow: 1,
    margin: '20px',
    borderRadius: 4,
    padding: '20px',
    backgroundColor: '#FFFFFF',
    overflowY: 'auto',
  },
  iconButton: {
    background: '#FBF7F7',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    marginRight: '8px',
  },
}));

function MainContent() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const sideBarSettings = useSelector(selectSideBarSettings);
  const sideBarOpen = get(sideBarSettings, 'isOpen');

  const handleSideBarToggle = () => {
    dispatch(toggleSideBarOpen());
  };

  const handleAddNewWidget = () => {};

  return (
    <main className={classes.content}>
      <Switch>
        <PrivateRoute exact path="/">
          <>
            <ToolBar>
              <div>
                <IconButton className={classes.iconButton} onClick={handleSideBarToggle}>
                  {sideBarOpen ? <RiMenuFoldLine /> : <RiMenuUnfoldLine />}
                </IconButton>
                <IconButton className={classes.iconButton} onClick={handleAddNewWidget}>
                  <MdAdd />
                </IconButton>
              </div>
              <CurrentDateWidget />
            </ToolBar>
            <WidgetsGrid />
          </>
        </PrivateRoute>
        <Route path="/about">hi this is about page</Route>
      </Switch>
    </main>
  );
}

export default MainContent;
