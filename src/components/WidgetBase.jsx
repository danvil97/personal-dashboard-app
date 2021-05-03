import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, makeStyles } from '@material-ui/core';
import { RiBallPenLine, RiDragMoveFill } from 'react-icons/ri';

const useStyles = makeStyles(() => ({
  root: {
    padding: '8px',
    '&:hover .widgetTools': {
      display: 'block',
    },
  },
  widgetTitle: {
    fontWeight: 'bold',
    fontSize: '16px',
  },
  widgetToolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25px',
  },
  widgetTools: {
    display: 'none',
  },
  widgetContent: { padding: '4px' },
}));

function WidgetBase({ children, title }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.widgetToolbar}>
        <div className={classes.widgetTitle}>{title}</div>
        <div className={`${classes.widgetTools} widgetTools`}>
          <IconButton size="small">
            <RiBallPenLine />
          </IconButton>
          <IconButton size="small" className="draggableHandle">
            <RiDragMoveFill />
          </IconButton>
        </div>
      </div>
      <div className={classes.widgetContent}>{children}</div>
    </div>
  );
}

WidgetBase.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
};
WidgetBase.defaultProps = {
  title: null,
};

export default WidgetBase;
