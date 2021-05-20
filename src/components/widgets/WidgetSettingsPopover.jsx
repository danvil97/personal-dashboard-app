import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { IconButton, Popover } from '@material-ui/core';
import { RiSettings3Line } from 'react-icons/ri';

function WidgetSettingsPopover({ children }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
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
        {children}
      </Popover>
    </>
  );
}
WidgetSettingsPopover.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

WidgetSettingsPopover.defaultProps = {
  children: null,
};

export default WidgetSettingsPopover;
