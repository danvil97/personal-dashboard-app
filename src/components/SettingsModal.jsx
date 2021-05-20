/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';

import { RiCloseLine, RiSettings3Line } from 'react-icons/ri';
import { closeSettingsModal, selectSettingsModalSettings } from '../features/appSlice';
import {
  selectUserSettings,
  sendUserSettingsToFirestoreThunk,
} from '../features/userSettingsSlice';

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
  settingsSection: {
    display: 'flex',
    justifyContent: 'space-between',
    '&:not(:last-child)': { borderBottom: '1px solid rgba(0, 0, 0, 0.12)' },
    marginBottom: '8px',
    paddingBottom: '8px',
  },
  settingsSectionTitle: {
    fontWeight: 'bold',
    minWidth: '120px',
  },
  settingsSettings: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginLeft: '64px',
  },
}));

function SettingsModal() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const modalSettings = useSelector(selectSettingsModalSettings);
  const userSettings = useSelector(selectUserSettings);
  const { control, getValues } = useForm();

  const handleClose = () => {
    dispatch(closeSettingsModal());
    console.log(getValues());
  };

  const handleSave = () => {
    handleClose();
    dispatch(sendUserSettingsToFirestoreThunk({ settings: getValues() }));
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
        <div className={classes.settingsSection}>
          <Typography gutterBottom className={classes.settingsSectionTitle}>
            Time & Date
          </Typography>
          <div className={classes.settingsSettings}>
            <Controller
              name="showTime"
              control={control}
              defaultValue={userSettings.showTime}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label="Show time"
                  labelPlacement="end"
                />
              )}
            />
            <Controller
              name="timeFormat"
              control={control}
              defaultValue={userSettings.timeFormat}
              render={({ field }) => (
                <FormControl>
                  <InputLabel id="time-format">Time format</InputLabel>
                  <Select labelId="time-format" {...field}>
                    <MenuItem value="h:mm:ss a">h:mm:ss a (7:18:28 pm)</MenuItem>
                    <MenuItem value="HH:mm:ss">h:mm:ss a (14:04:03)</MenuItem>
                    <MenuItem value="HH:mm">HH:mm (14:04)</MenuItem>
                    <MenuItem value="h:mma">h:mma (2:04pm)</MenuItem>
                    <MenuItem value="h:mm A">h:mm A (2:04 PM)</MenuItem>
                  </Select>
                </FormControl>
              )}
            />

            <Controller
              name="showDate"
              control={control}
              defaultValue={userSettings.showDate}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label="Show date"
                  labelPlacement="end"
                />
              )}
            />
            <Controller
              name="dateFormat"
              control={control}
              defaultValue={userSettings.dateFormat}
              render={({ field }) => (
                <FormControl>
                  <InputLabel id="date-format">Date format</InputLabel>
                  <Select labelId="date-format" {...field}>
                    <MenuItem value="Do MMMM YYYY">Do MMMM YYYY (19th May 2021)</MenuItem>
                    <MenuItem value="MMM Do YY">MMM Do YY (May 19th 21)</MenuItem>
                    <MenuItem value="MMMM Do YYYY">MMMM Do YYYY (May 19th 2021)</MenuItem>
                    <MenuItem value="YYYY-MM-DD">YYYY-MM-DD (2019-06-01)</MenuItem>
                    <MenuItem value="MMMM Do, YYYY">MMMM Do, YYYY (June 1st, 2019)</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              name="showDay"
              control={control}
              defaultValue={userSettings.showDay}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label="Show day of the week"
                  labelPlacement="end"
                />
              )}
            />
          </div>
        </div>
        <div className={classes.settingsSection}>
          <Typography gutterBottom className={classes.settingsSectionTitle}>
            Language
          </Typography>
          <div className={classes.settingsSettings}>
            <Controller
              name="language"
              control={control}
              defaultValue={userSettings.language}
              render={({ field }) => (
                <FormControl>
                  <InputLabel id="language">Language</InputLabel>
                  <Select labelId="language" {...field}>
                    <MenuItem value="ENG">English</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SettingsModal;
