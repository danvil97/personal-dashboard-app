import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { get } from 'lodash';
import { makeStyles, IconButton } from '@material-ui/core';
import { RiMenuFoldLine, RiMenuUnfoldLine } from 'react-icons/ri';

import { selectSideBarSettings, toggleSideBarOpen } from '../features/appSlice';
import ToolBar from './ToolBar';
import CurrentDateWidget from '../components/widgets/CurrentDateWidget';
import WidgetBase from '../components/WidgetBase';

const useStyles = makeStyles(() => ({
  content: {
    flexGrow: 1,
    margin: '20px',
    borderRadius: 4,
    padding: '20px',
    backgroundColor: '#FFFFFF',
  },
  iconButton: {
    background: '#FBF7F7',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
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

  return (
    <main className={classes.content}>
      <Switch>
        <Route exact path="/">
          <>
            <ToolBar>
              <IconButton className={classes.iconButton} onClick={handleSideBarToggle}>
                {sideBarOpen ? <RiMenuFoldLine /> : <RiMenuUnfoldLine />}
              </IconButton>
              <CurrentDateWidget />
            </ToolBar>
            <WidgetBase title="i am title">
              Hi i am widgetHi i am widgetHi i am widgetHi i am widgetHi i am widget
            </WidgetBase>
          </>
        </Route>
        <Route path="/about">hi this is about page</Route>
      </Switch>
    </main>
  );
}

export default MainContent;
