import React from 'react';
import PropTypes from 'prop-types';
import { MdAdd } from 'react-icons/md';
import { IconButton, makeStyles, Menu, MenuItem } from '@material-ui/core';

import WIDGET_LIST from '../constants/widgetList';

const useStyles = makeStyles(() => ({
  iconButton: {
    background: '#FBF7F7',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    marginRight: '8px',
  },
}));

function AddWidget({ addWidgetFunc }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddNewWidget = (widget) => {
    addWidgetFunc(widget);
    handleClose();
  };
  return (
    <>
      <IconButton className={classes.iconButton} onClick={handleClick}>
        <MdAdd />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        {WIDGET_LIST.map((widget) => (
          <MenuItem onClick={() => handleAddNewWidget(widget)}>{widget.name}</MenuItem>
        ))}
      </Menu>
    </>
  );
}

AddWidget.propTypes = {
  addWidgetFunc: PropTypes.func.isRequired,
};

export default AddWidget;
