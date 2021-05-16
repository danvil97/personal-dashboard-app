import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
    paddingBottom: '8px',
    borderBottom: '1px solid #b2b2b2',
  },
}));

function ToolBar({ children }) {
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
}

ToolBar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired,
};

export default ToolBar;
