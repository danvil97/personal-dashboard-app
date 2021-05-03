import React from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton } from '@material-ui/core';

function MenuItemButton({ className, onClickHandler, iconComponent, children, iconOnly }) {
  return iconOnly ? (
    <IconButton variant="text" className={className} onClick={onClickHandler}>
      {iconComponent}
    </IconButton>
  ) : (
    <Button variant="text" className={className} onClick={onClickHandler} startIcon={iconComponent}>
      {children}
    </Button>
  );
}
MenuItemButton.propTypes = {
  iconComponent: PropTypes.element.isRequired,
  className: PropTypes.string,
  onClickHandler: PropTypes.func,
  children: PropTypes.element,
  iconOnly: PropTypes.bool,
};
MenuItemButton.defaultProps = {
  className: null,
  onClickHandler: null,
  children: null,
  iconOnly: false,
};

export default MenuItemButton;
