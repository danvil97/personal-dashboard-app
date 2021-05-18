import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Popover } from '@material-ui/core';

function IconButtonPopover({ icon, popoverContent, withClose }) {
  const [open, setOpen] = useState(false);
  const iconRef = useRef(null);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    withClose();
  };

  return (
    <>
      <IconButton size="small" onClick={handleClick} ref={iconRef}>
        {icon}
      </IconButton>
      <Popover
        open={open}
        anchorEl={iconRef.current}
        onClose={handleClose}
        keepMounted
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {popoverContent({ onClose: handleClose })}
      </Popover>
    </>
  );
}
IconButtonPopover.propTypes = {
  icon: PropTypes.element.isRequired,
  popoverContent: PropTypes.element.isRequired,
  withClose: PropTypes.func,
};

IconButtonPopover.defaultProps = {
  withClose: null,
};

export default IconButtonPopover;
