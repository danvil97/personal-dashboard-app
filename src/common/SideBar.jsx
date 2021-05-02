import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import clsx from 'clsx';
import { get } from 'lodash';
import { Button, Drawer, makeStyles } from '@material-ui/core';
import { selectSideBarSettings } from '../features/appSlice';
import UserProfilePreview from '../components/UserProfilePreview';
import { selectActiveUser, setActiveUser } from '../features/userSlice';

import { auth, provider } from '../firebase';

const SIDE_PANEL_WIDTH = 240;
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: SIDE_PANEL_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerPaper: {
    backgroundColor: '#152459',
    padding: '20px 8px',
    color: '#F5F5F5',
    alignItems: 'center',
  },
  drawerOpen: {
    width: SIDE_PANEL_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
}));

function SideBar() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const sideBarSettings = useSelector(selectSideBarSettings);
  const userProfile = useSelector(selectActiveUser);

  const sideBarOpen = get(sideBarSettings, 'isOpen', false);
  const isLogged = get(userProfile, 'isLogged', false);

  const login = () => {
    auth.signInWithPopup(provider).then((result) => {
      const userProfileResult = get(result, ['additionalUserInfo', 'profile'], {
        name: null,
        picture: null,
      });
      const { name, picture } = userProfileResult;
      dispatch(setActiveUser({ userName: name, userPicture: picture }));
    });
  };
  // const logout = () => {
  //   auth.signOut().then((result) => console.log(result));
  // };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: sideBarOpen,
        [classes.drawerClose]: !sideBarOpen,
      })}
      classes={{
        paper: clsx(classes.drawerPaper, {
          [classes.drawerOpen]: sideBarOpen,
          [classes.drawerClose]: !sideBarOpen,
        }),
      }}
    >
      {isLogged ? (
        <UserProfilePreview
          profilePic={userProfile.userPicture}
          userName={userProfile.userName}
          imageOnly={!sideBarOpen}
        />
      ) : (
        <Button onClick={login}>Login</Button>
      )}
    </Drawer>
  );
}

export default SideBar;
