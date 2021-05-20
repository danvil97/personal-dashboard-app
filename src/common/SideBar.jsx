import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import clsx from 'clsx';
import { get } from 'lodash';
import {
  RiLogoutBoxLine,
  RiLoginBoxLine,
  RiSettings3Line,
  RiQuestionnaireLine,
} from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { Drawer, makeStyles } from '@material-ui/core';
import { openSettingsModal, selectSideBarSettings } from '../features/appSlice';
import UserProfilePreview from '../components/UserProfilePreview';
import { selectActiveUser, setActiveUser, setUserLogOut } from '../features/userSlice';

import { auth, provider, db } from '../firebase';
import MenuItemButton from './MenuItemButton';
import logoSVG from '../assets/logo.svg';
import { setWidgetDataFromFirestoreThunk } from '../features/widgetsSlice';
import {
  defaultUserSettings,
  setUserSettingsFromFirestoreThunk,
} from '../features/userSettingsSlice';

const SIDE_PANEL_WIDTH = 160;
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: SIDE_PANEL_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerPaper: {
    marginTop: '26px',
    backgroundColor: '#152459',
    padding: '20px 8px',
    color: '#F5F5F5',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '93%',
  },
  drawerOpen: {
    width: SIDE_PANEL_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(4) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(4) + 1,
    },
  },
  menuItem: {
    color: '#F5F5F5',
  },
  menuItems: {
    display: 'flex',
    flexDirection: 'column',
  },
  loginButton: {
    color: '#fff',
  },
  monoLogoImg: {
    '& img': { padding: '4px', borderRadius: 5, backgroundColor: 'white', width: '30px' },
  },
}));

function SideBar() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const sideBarSettings = useSelector(selectSideBarSettings);
  const userProfile = useSelector(selectActiveUser);

  const sideBarOpen = get(sideBarSettings, 'isOpen', false);
  const isLogged = get(userProfile, 'isLogged', false);

  useEffect(() => {
    if (isLogged) {
      dispatch(setWidgetDataFromFirestoreThunk());
      dispatch(setUserSettingsFromFirestoreThunk());
    }
  });

  const login = () => {
    auth.signInWithPopup(provider).then((result) => {
      const userProfileResult = get(result, ['additionalUserInfo', 'profile']);
      const uid = get(result, ['user', 'uid']);
      const { name, picture } = userProfileResult;

      if (result.additionalUserInfo.isNewUser) {
        db.collection('users')
          .doc(uid)
          .set({
            settings: { ...defaultUserSettings },
            addedWidgets: [],
          })
          .then(() => {
            console.log('Document successfully written!');
          })
          .catch((error) => {
            console.error('Error writing document: ', error);
          });
      }
      dispatch(setActiveUser({ userName: name, userPicture: picture, uid }));
    });
  };

  const logout = () => {
    auth.signOut().then(dispatch(setUserLogOut()));
  };

  const openSettings = () => {
    dispatch(openSettingsModal());
  };

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
      <div>
        {isLogged ? (
          <UserProfilePreview
            profilePic={userProfile.userPicture}
            userName={userProfile.userName}
            imageOnly={!sideBarOpen}
          />
        ) : (
          <MenuItemButton
            className={classes.menuItem}
            iconComponent={<RiLoginBoxLine />}
            iconOnly={!sideBarOpen}
            onClickHandler={login}
          >
            Login
          </MenuItemButton>
        )}
      </div>
      <div className={classes.menuItems}>
        {isLogged && (
          <>
            <MenuItemButton
              className={classes.menuItem}
              iconComponent={<CgProfile />}
              iconOnly={!sideBarOpen}
            >
              Profile
            </MenuItemButton>
            <MenuItemButton
              className={classes.menuItem}
              iconComponent={<RiSettings3Line />}
              iconOnly={!sideBarOpen}
              onClickHandler={openSettings}
            >
              Settings
            </MenuItemButton>
            <MenuItemButton
              className={classes.menuItem}
              iconComponent={<RiQuestionnaireLine />}
              iconOnly={!sideBarOpen}
            >
              About
            </MenuItemButton>
            <MenuItemButton
              className={classes.menuItem}
              onClickHandler={logout}
              iconComponent={<RiLogoutBoxLine />}
              iconOnly={!sideBarOpen}
            >
              Logout
            </MenuItemButton>
          </>
        )}
      </div>
      {sideBarOpen && <div className={classes.monoLogo}>mono view.</div>}
      {!sideBarOpen && (
        <div className={classes.monoLogoImg}>
          <img src={logoSVG} alt="logo" />
        </div>
      )}
    </Drawer>
  );
}

export default SideBar;
