import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { hideNotification, selectNotificationSettings } from '../features/notificationSlice';

function NotificationBar() {
  const dispatch = useDispatch();
  const snackbarSettings = useSelector(selectNotificationSettings);
  const handleClose = () => {
    dispatch(hideNotification());
  };

  return (
    <>
      <Snackbar
        open={snackbarSettings.isOpen}
        onClose={handleClose}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        autoHideDuration={3000}
      >
        <Alert elevation={6} variant="filled" onClose={handleClose} color={snackbarSettings.type}>
          {snackbarSettings.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default NotificationBar;
