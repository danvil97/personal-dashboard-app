import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel, IconButton, makeStyles } from '@material-ui/core';
import { TiDeleteOutline } from 'react-icons/ti';

const useStyles = makeStyles(() => ({
  todoItem: { display: 'flex', '&:hover .todo-removeButton': { display: 'block' } },
  removeButton: { marginLeft: 'auto', display: 'none' },
}));

function ToDoItem({ id, text, isCompleted, onComplete, onRemove }) {
  const classes = useStyles();
  return (
    <div className={classes.todoItem} key={id}>
      <FormControlLabel
        control={<Checkbox checked={isCompleted} onChange={onComplete} />}
        label={text}
      />
      <IconButton
        onClick={onRemove}
        size="small"
        className={`${classes.removeButton} todo-removeButton`}
      >
        <TiDeleteOutline />
      </IconButton>
    </div>
  );
}

ToDoItem.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  onComplete: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default ToDoItem;
