import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Button, IconButton, makeStyles, Popover } from '@material-ui/core';
import { RiSettings3Line } from 'react-icons/ri';

const useStyles = makeStyles((theme) => ({
  popoverContent: {
    padding: theme.spacing(2),
  },
}));

function WidgetSettingsPopover({ children, onSave }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSave = () => {
    onSave();
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton size="small" onClick={handleClick}>
        <RiSettings3Line />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <div className={classes.popoverContent}>
          {children}
          <Button onClick={handleSave}>Save settings</Button>
        </div>
      </Popover>
    </>
  );
}
WidgetSettingsPopover.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  onSave: PropTypes.func,
};

WidgetSettingsPopover.defaultProps = {
  children: null,
  onSave: () => {},
};

export default WidgetSettingsPopover;
