import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { MdAdd } from 'react-icons/md';
import { IconButton, makeStyles } from '@material-ui/core';

import WidgetToolbar from '../../WidgetToolbar';
import { updateWidget } from '../../../features/widgetsSlice';
import ToDoItem from './ToDoItem';

const useStyles = makeStyles(() => ({ todoList: {} }));

function ToDoWidget({ id, toDoData }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const addNew = () => {
    dispatch(updateWidget());
  };

  const customTools = [
    <IconButton size="small" onClick={addNew}>
      <MdAdd />
    </IconButton>,
  ];
  const onComplete = () => {};
  const onRemove = () => {};

  return (
    <div className="commonWidget">
      <WidgetToolbar title="Todo" id={id} customTools={customTools} />
      <div className={classes.todoList}>
        {toDoData.map((todo) => (
          <ToDoItem
            id={todo.id}
            text={todo.text}
            isCompleted={todo.isCompleted}
            onComplete={onComplete}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
}

ToDoWidget.propTypes = {
  toDoData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      isCompleted: PropTypes.bool,
    })
  ),
  id: PropTypes.string.isRequired,
};

ToDoWidget.defaultProps = {
  toDoData: [
    { id: '1', text: 'sample', isCompleted: false },
    { id: '2', text: 'sample completed', isCompleted: true },
  ],
};

export default ToDoWidget;
