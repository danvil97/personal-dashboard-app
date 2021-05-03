import React from 'react';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  profilePicture: {
    borderRadius: 50,
    width: 60,
  },
  profileName: {
    fontWeight: 500,
    fontFamily: 'Roboto',
    marginLeft: '12px',
  },
}));

function UserProfilePreview({ profilePic, userName, imageOnly }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img className={classes.profilePicture} src={profilePic} alt="userName" />
      {!imageOnly && <span className={classes.profileName}>{userName}</span>}
    </div>
  );
}

UserProfilePreview.propTypes = {
  profilePic: PropTypes.string,
  userName: PropTypes.string.isRequired,
  imageOnly: PropTypes.bool,
};
UserProfilePreview.defaultProps = {
  profilePic: 'https://via.placeholder.com/150',
  imageOnly: false,
};
export default UserProfilePreview;
