/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import NoteWidget from '../components/widgets/NoteWidget';
import CurrentWeatherWidget from '../components/widgets/CurrentWeatherWidget';
import ToDoWidget from '../components/widgets/ToDoWidget/ToDoWidget';
import PomodoroWidget from '../components/widgets/PomodoroWidget/PomodoroWidget';
import QuickLinksWidget from '../components/widgets/QuickLinksWidget';

function chooseWidget(name, props) {
  switch (name) {
    case 'Note':
      return <NoteWidget {...props} />;
    case 'CurrentWeather':
      return <CurrentWeatherWidget {...props} />;
    case 'ToDo':
      return <ToDoWidget {...props} />;
    case 'Pomodoro':
      return <PomodoroWidget {...props} />;
    case 'Quick Links':
      return <QuickLinksWidget {...props} />;
    default:
      return null;
  }
}

export default chooseWidget;
