import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { MdAdd } from 'react-icons/md';
import { RiCheckLine } from 'react-icons/ri';
import { FormControl, IconButton, makeStyles, OutlinedInput } from '@material-ui/core';

import WidgetToolbar from '../../WidgetToolbar';
import { addTodo, toggleTodo, removeTodo } from '../../../features/widgetsSlice';
import ToDoItem from './ToDoItem';
import { showNotification } from '../../../features/notificationSlice';

const useStyles = makeStyles(() => ({}));

function ToDoWidget({ id, todoList }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(false);
  const [newTodoText, setNewTodoText] = useState('');

  const onAdd = () => {
    setIsEditing(true);
  };

  const addNewTodo = (text) => {
    const newTodo = {
      id: nanoid(),
      text,
      isCompleted: false,
    };
    dispatch(addTodo({ id, newTodo }));
    setIsEditing(false);
    setNewTodoText('');
    dispatch(
      showNotification({
        message: 'New todo item was created',
        type: 'success',
      })
    );
  };

  const onToggleTodo = (todoId) => () => {
    dispatch(toggleTodo({ id, todoId }));
  };

  const onRemove = (todoId) => () => {
    dispatch(removeTodo({ id, todoId }));
    dispatch(
      showNotification({
        message: 'Todo item was removed',
        type: 'success',
      })
    );
  };

  const customTools = [
    <IconButton size="small" onClick={onAdd} key="0">
      <MdAdd />
    </IconButton>,
  ];
  return (
    <div className="commonWidget">
      <WidgetToolbar title="Todo" id={id} customTools={customTools} />
      <div>
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
        {isEditing && (
          <div>
            <FormControl fullWidth variant="outlined" size="small">
              <OutlinedInput
                value={newTodoText}
                onChange={(ev) => setNewTodoText(ev.target.value)}
                autoFocus
                endAdornment={
                  <IconButton
                    onClick={() => {
                      addNewTodo(newTodoText);
                    }}
                    size="small"
                    className={`${classes.removeButton} todo-removeButton`}
                    disabled={!newTodoText}
                  >
                    <RiCheckLine />
                  </IconButton>
                }
              />
            </FormControl>
          </div>
        )}
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
