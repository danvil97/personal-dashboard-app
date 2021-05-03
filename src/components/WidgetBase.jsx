import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, makeStyles } from '@material-ui/core';
import { RiBallPenLine, RiDragMoveFill } from 'react-icons/ri';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#FCF9F9',
    width: '208px',
    height: '93px',
    boxShadow: '-2px 2px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '5px',
    padding: '8px',
  },
  widgetTitle: {
    fontWeight: 'bold',
    fontSize: '16px',
  },
  widgetToolbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  widgetTools: {},
  widgetContent: { padding: '4px' },
}));

function WidgetBase({ children, title }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.widgetToolbar}>
        <div className={classes.widgetTitle}>{title}</div>
        <div className={classes.widgetTools}>
          <IconButton size="small">
            <RiBallPenLine />
          </IconButton>
          <IconButton size="small">
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
