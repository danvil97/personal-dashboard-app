/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { Controller, useForm } from 'react-hook-form';
import { Button, IconButton, makeStyles, TextField, Typography } from '@material-ui/core';
import { MdAdd } from 'react-icons/md';
import { RiCloseLine } from 'react-icons/ri';

import { flexColumn } from '../../../constants/styleHelpers';
import IconButtonPopover from '../../../common/IconButtonPopover';
import { addQuickLink } from '../../../features/widgetsSlice';

const useStyles = makeStyles((theme) => ({
  popoverRoot: {
    minWidth: '240px',
    padding: theme.spacing(0.5, 0.5, 0.5, 1),
    maxHeight: '200px',
    overflow: 'hidden',
    ...flexColumn,
  },
  popoverTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(0.25),
    fontWeight: 'bold',
  },
  popoverContent: {
    marginBottom: theme.spacing(0.5),
    display: 'flex',
    flexDirection: 'column',
  },
  popoverActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    '&> button:first-child': { marginRight: theme.spacing(1) },
  },
}));

function AddLinkPopover({ id }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { control, reset, formState, getValues } = useForm({ mode: 'onChange' });

  const handleAddNewLink = () => {
    const name = getValues('urlName');
    const url = getValues('url');
    dispatch(addQuickLink({ id, newLink: { id: nanoid(), name, url } }));
  };

  const popoverContentRenderer = ({ onClose }) => (
    <div className={classes.popoverRoot}>
      <div className={classes.popoverTitle}>
        <Typography variant="body1">Add new link</Typography>
        <IconButton onClick={onClose} size="medium">
          <RiCloseLine />
        </IconButton>
      </div>
      <div className={classes.popoverContent}>
        <Controller
          name="urlName"
          control={control}
          rules={{
            required: 'This field is required',
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              labelWidth={40}
              label="URL Name"
              error={error}
              helperText={error ? error.message : null}
              size="small"
              {...field}
            />
          )}
        />
        <Controller
          name="url"
          control={control}
          rules={{
            required: 'Fill this field please',
            pattern: {
              value: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
              message: 'Value must be URL',
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              labelWidth={40}
              label="URL"
              error={error}
              helperText={error ? error.message : null}
              size="small"
              {...field}
            />
          )}
        />
      </div>
      <div className={classes.popoverActions}>
        <Button>Cancel</Button>
        <Button
          color="primary"
          variant="contained"
          disabled={!formState.isValid}
          onClick={() => {
            handleAddNewLink();
            reset();
            onClose();
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );

  return (
    <IconButtonPopover icon={<MdAdd />} popoverContent={popoverContentRenderer} withClose={reset} />
  );
}

AddLinkPopover.propTypes = { id: PropTypes.string.isRequired };

export default AddLinkPopover;
