import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { makeStyles, TextField } from '@material-ui/core';

import WidgetToolbar from '../WidgetToolbar';
import { updateWidget } from '../../features/widgetsSlice';

const useStyles = makeStyles(() => ({
  noteText: { overflowY: 'auto', overflowWrap: 'break-word', width: '100%', maxHeight: '100%' },
  noteInput: { width: '100%', height: '100%' },
  noteTextRoot: {
    border: 'none!important',
    padding: '0!important',
  },
}));

function NoteWidget({ text, id }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [noteText, setNoteText] = useState(text);
  const [isEditingMode, setIsEditingMode] = useState(false);

  const onNoteChange = (event) => {
    const newValue = event.target.value;
    setNoteText(newValue);
  };
  const onNoteKeyDown = ({ key, shiftKey }) => {
    if (key === 'Enter' && !shiftKey) {
      setIsEditingMode(false);
      dispatch(updateWidget({ id, text: noteText }));
    }
  };

  const onEdit = () => {
    setIsEditingMode(true);
  };

  return (
    <div className="commonWidget">
      <WidgetToolbar title="Note" onEdit={onEdit} id={id} />
      <div className={classes.noteText}>
        {isEditingMode ? (
          <TextField
            multiline
            value={noteText}
            onChange={onNoteChange}
            onKeyDown={onNoteKeyDown}
            className={classes.noteInput}
            autoFocus
          />
        ) : (
          noteText
        )}
      </div>
    </div>
  );
}

NoteWidget.propTypes = {
  text: PropTypes.string,
  id: PropTypes.string.isRequired,
};

NoteWidget.defaultProps = {
  text: '',
};

export default NoteWidget;
