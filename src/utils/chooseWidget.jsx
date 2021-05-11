/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import NoteWidget from '../components/widgets/NoteWidget';
import CurrentWeatherWidget from '../components/widgets/CurrentWeatherWidget';
import ToDoWidget from '../components/widgets/ToDoWidget/ToDoWidget';

function chooseWidget(name, props) {
  switch (name) {
    case 'Note':
      return <NoteWidget {...props} />;
    case 'CurrentWeather':
      return <CurrentWeatherWidget {...props} />;
    case 'ToDo':
      return <ToDoWidget {...props} />;
    default:
      return null;
  }
}

export default chooseWidget;
