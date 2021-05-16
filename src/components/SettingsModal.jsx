import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';

import { RiCloseLine, RiSettings3Line } from 'react-icons/ri';
import { closeSettingsModal, selectSettingsModalSettings } from '../features/appSlice';

const useStyles = makeStyles(() => ({
  dialogPaper: {
    minWidth: '600px',
  },
  dialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dialogTitleText: {
    '&>svg': {
      marginRight: '8px',
    },
    display: 'flex',
    alignItems: 'center',
  },
}));

function SettingsModal() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const modalSettings = useSelector(selectSettingsModalSettings);

  const handleClose = () => {
    dispatch(closeSettingsModal());
  };
  return (
    <Dialog
      onClose={handleClose}
      open={modalSettings.isOpen}
      className={classes.dialog}
      classes={{ paper: classes.dialogPaper }}
    >
      <DialogTitle onClose={handleClose}>
        <div className={classes.dialogTitle}>
          <span className={classes.dialogTitleText}>
            <RiSettings3Line />
            Settings
          </span>
          <IconButton onClick={handleClose}>
            <RiCloseLine />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>Time & Date format</Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SettingsModal;
