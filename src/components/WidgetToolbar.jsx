import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, makeStyles } from '@material-ui/core';
import { RiBallPenLine, RiDragMoveFill } from 'react-icons/ri';
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

function WidgetToolbar({ title, id, onEdit, onRemove, isDraggable }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeWidget({ id }));
  };

  return (
    <div className={classes.root}>
      <div className={classes.widgetTitle}>{title}</div>
      <div className={`${classes.widgetTools} widgetTools`}>
        {onEdit && (
          <IconButton size="small" onClick={onEdit}>
            <RiBallPenLine />
          </IconButton>
        )}
        <IconButton size="small" onClick={onRemove || handleRemove}>
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
  title: PropTypes.string,
  id: PropTypes.string.isRequired,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  isDraggable: PropTypes.bool,
};
WidgetToolbar.defaultProps = {
  title: null,
  onEdit: null,
  onRemove: null,
  isDraggable: true,
};

export default WidgetToolbar;
