import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, makeStyles } from '@material-ui/core';
import { RiDragMoveFill } from 'react-icons/ri';
import { TiDeleteOutline } from 'react-icons/ti';
import { useDispatch } from 'react-redux';
import { removeWidget } from '../features/widgetsSlice';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25px',

    '&:hover .widgetTools': {
      display: 'block',
    },
  },
  widgetTitle: {
    fontWeight: 'bold',
    fontSize: '16px',
  },
  widgetTools: {
    display: 'none',
  },
}));

function WidgetToolbar({ title, id, onRemove, isDraggable, customTools }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleRemove =
    onRemove ||
    (() => {
      dispatch(removeWidget({ id }));
    });

  return (
    <div className={classes.root}>
      <div className={classes.widgetTitle}>{title}</div>
      <div className={`${classes.widgetTools} widgetTools`}>
        {customTools && customTools.map((ct) => ct)}
        <IconButton size="small" onClick={handleRemove}>
          <TiDeleteOutline />
        </IconButton>
        {isDraggable && (
          <IconButton size="small" className="draggableHandle">
            <RiDragMoveFill />
          </IconButton>
        )}
      </div>
    </div>
  );
}

WidgetToolbar.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  onRemove: PropTypes.func,
  isDraggable: PropTypes.bool,
  customTools: PropTypes.arrayOf(PropTypes.any),
};
WidgetToolbar.defaultProps = {
  title: null,
  onRemove: null,
  isDraggable: true,
  customTools: [],
};

export default WidgetToolbar;
