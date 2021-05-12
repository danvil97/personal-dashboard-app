import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { MdAdd } from 'react-icons/md';
import { IconButton, makeStyles } from '@material-ui/core';

import WidgetToolbar from '../../WidgetToolbar';
import { addTodo, toggleTodo, removeTodo } from '../../../features/widgetsSlice';
import ToDoItem from './ToDoItem';

const useStyles = makeStyles(() => ({ todoList: {} }));

function ToDoWidget({ id, todoList }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const addNewTodo = () => {
    const newTodo = {
      id: nanoid(),
      text: 'Sample',
      isCompleted: false,
    };
    dispatch(addTodo({ id, newTodo }));
  };

  const onToggleTodo = (todoId) => () => {
    dispatch(toggleTodo({ id, todoId }));
  };

  const onRemove = (todoId) => () => {
    dispatch(removeTodo({ id, todoId }));
  };

  const customTools = [
    <IconButton size="small" onClick={addNewTodo} key="0">
      <MdAdd />
    </IconButton>,
  ];
  return (
    <div className="commonWidget">
      <WidgetToolbar title="Todo" id={id} customTools={customTools} />
      <div className={classes.todoList}>
        {todoList.map((todo) => (
          <ToDoItem
            id={todo.id}
            key={todo.id}
            text={todo.text}
            isCompleted={todo.isCompleted}
            toggleTodo={onToggleTodo(todo.id)}
            onRemove={onRemove(todo.id)}
          />
        ))}
      </div>
    </div>
  );
}

ToDoWidget.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      isCompleted: PropTypes.bool,
    })
  ),
  id: PropTypes.string.isRequired,
};

ToDoWidget.defaultProps = {
  todoList: [
    { id: '1', text: 'sample', isCompleted: false },
    { id: '2', text: 'sample completed', isCompleted: true },
  ],
};

export default ToDoWidget;
