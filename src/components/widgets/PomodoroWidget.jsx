import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Button, IconButton, makeStyles } from '@material-ui/core';
import { RiSettings3Line } from 'react-icons/ri';
import { changePomodoroTimers } from '../../features/widgetsSlice';

import WidgetToolbar from '../WidgetToolbar';
import { decreaseByOneSafe } from '../../utils/pomodoroUtils';

const useStyles = makeStyles(() => ({
  stateChanger: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));
const POMODORO_CYCLES = {
  pomodoro: 0,
  shortBreak: 1,
  longBreak: 2,
};
function PomodoroWidget({ id, settings }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [pomodoroCycle, setPomodoroCycle] = useState(POMODORO_CYCLES.pomodoro);
  //   const [timerData, setTimerData] = useState();

  const switchPomodoroState = (newPomodoroCycle) => () => {
    if (newPomodoroCycle !== pomodoroCycle) setPomodoroCycle(newPomodoroCycle);
  };

  const increaseTimer = () => {
    let updatedTimers;
    switch (pomodoroCycle) {
      case POMODORO_CYCLES.pomodoro:
        updatedTimers = { pomodoro: settings.timers.pomodoro + 1 };
        break;
      case POMODORO_CYCLES.shortBreak:
        updatedTimers = { shortBreak: settings.timers.shortBreak + 1 };
        break;
      case POMODORO_CYCLES.longBreak:
        updatedTimers = { longBreak: settings.timers.longBreak + 1 };
        break;
      default:
        break;
    }
    dispatch(changePomodoroTimers({ id, updatedTimers }));
  };

  const decreaseTimer = () => {
    let updatedTimers;
    switch (pomodoroCycle) {
      case POMODORO_CYCLES.pomodoro:
        updatedTimers = {
          pomodoro: decreaseByOneSafe(settings.timers.pomodoro),
        };
        break;
      case POMODORO_CYCLES.shortBreak:
        updatedTimers = { shortBreak: decreaseByOneSafe(settings.timers.shortBreak) };
        break;
      case POMODORO_CYCLES.longBreak:
        updatedTimers = { longBreak: decreaseByOneSafe(settings.timers.longBreak) };
        break;
      default:
        break;
    }
    dispatch(changePomodoroTimers({ id, updatedTimers }));
  };

  const customTools = [
    <IconButton size="small" onClick={() => {}} key="0">
      <RiSettings3Line />
    </IconButton>,
  ];

  console.log(settings);

  return (
    <div className="commonWidget">
      <WidgetToolbar title="Pomodoro" id={id} customTools={customTools} />
      <div className={classes.root}>
        <div className={classes.stateChanger}>
          <Button size="small" onClick={switchPomodoroState(POMODORO_CYCLES.pomodoro)}>
            Pomodoro
          </Button>
          <Button size="small" onClick={switchPomodoroState(POMODORO_CYCLES.shortBreak)}>
            Short
          </Button>
          <Button size="small" onClick={switchPomodoroState(POMODORO_CYCLES.longBreak)}>
            Long
          </Button>
        </div>
        <div>
          <Button size="small" onClick={increaseTimer}>
            +
          </Button>
          <Button size="small" onClick={decreaseTimer}>
            -
          </Button>
        </div>
        <div>{settings.timers.pomodoro}</div>
        <div>{settings.timers.shortBreak}</div>
        <div>{settings.timers.longBreak}</div>
      </div>
    </div>
  );
}

PomodoroWidget.propTypes = {
  id: PropTypes.string.isRequired,
  settings: PropTypes.shape({
    pomodoroCount: PropTypes.number,
    beforeLongBreak: PropTypes.number,
    timers: PropTypes.shape({
      pomodoro: PropTypes.number,
      shortBreak: PropTypes.number,
      longBreak: PropTypes.number,
    }),
  }).isRequired,
};

export default PomodoroWidget;
