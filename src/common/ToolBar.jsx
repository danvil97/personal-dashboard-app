import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
}));

function ToolBar({ children }) {
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
}

ToolBar.propTypes = { children: PropTypes.element.isRequired };

export default ToolBar;
