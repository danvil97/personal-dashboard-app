/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Button, ButtonGroup, IconButton, makeStyles } from '@material-ui/core';
import { RiSettings3Line } from 'react-icons/ri';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { MdPlayArrow, MdPause, MdStop } from 'react-icons/md';

import { changePomodoroTimers, changePomodoroCount } from '../../../features/widgetsSlice';

import WidgetToolbar from '../../WidgetToolbar';
import { decreaseByOneSafe } from '../../../utils/pomodoroUtils';
import Timer from './Timer';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  stateChanger: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));
const POMODORO_CYCLES = {
  work: 'work',
  break: 'break',
};
function PomodoroWidget({ id, settings }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [pomodoroCycle, setPomodoroCycle] = useState(POMODORO_CYCLES.work);
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState({ minutes: settings.timers[pomodoroCycle], seconds: 0 });
  const [activeTimer, setActiveTimer] = useState(null);

  const updatePomodoroCount = (newPomodoroCount) => {
    dispatch(changePomodoroCount({ id, newPomodoroCount }));
  };

  useEffect(() => {
    setTimer({ minutes: settings.timers[pomodoroCycle], seconds: 0 });
  }, [pomodoroCycle, settings]);

  useEffect(() => {
    if (activeTimer && isActive) {
      const timerInterval = setInterval(() => {
        clearInterval(timerInterval);

        if (activeTimer.seconds === 0) {
          if (activeTimer.minutes !== 0) {
            setActiveTimer((prevTimer) => ({
              minutes: prevTimer.minutes - 1,
              seconds: 59,
            }));
          } else {
            setIsActive(false);
            setActiveTimer(null);
            if (pomodoroCycle === POMODORO_CYCLES.work) {
              updatePomodoroCount(settings.pomodoroCount === 4 ? 0 : settings.pomodoroCount + 1);
            }
            setPomodoroCycle(
              pomodoroCycle === POMODORO_CYCLES.work ? POMODORO_CYCLES.break : POMODORO_CYCLES.work
            );
          }
        } else {
          setActiveTimer((prevTimer) =>
            prevTimer
              ? {
                  minutes: prevTimer.minutes,
                  seconds: prevTimer.seconds - 1,
                }
              : null
          );
        }
      }, 1000);
    }
  }, [activeTimer, isActive]);

  const switchPomodoroState = (newPomodoroCycle) => () => {
    if (newPomodoroCycle !== pomodoroCycle) setPomodoroCycle(newPomodoroCycle);
    setActiveTimer(null);
  };

  const increaseTimer = () => {
    let updatedTimers;
    switch (pomodoroCycle) {
      case POMODORO_CYCLES.work:
        updatedTimers = { work: settings.timers.work + 1 };
        break;
      case POMODORO_CYCLES.break:
        updatedTimers = { break: settings.timers.break + 1 };
        break;
      default:
        break;
    }
    dispatch(changePomodoroTimers({ id, updatedTimers }));
  };

  const decreaseTimer = () => {
    let updatedTimers;
    switch (pomodoroCycle) {
      case POMODORO_CYCLES.work:
        updatedTimers = {
          work: decreaseByOneSafe(settings.timers.work),
        };
        break;
      case POMODORO_CYCLES.break:
        updatedTimers = { break: decreaseByOneSafe(settings.timers.break) };
        break;
      default:
        break;
    }
    dispatch(changePomodoroTimers({ id, updatedTimers }));
  };

  const updateTimer = () => {};
  const customTools = [
    <IconButton size="small" onClick={() => {}} key="0">
      <RiSettings3Line />
    </IconButton>,
  ];

  const onPlay = () => {
    if (!activeTimer) {
      setActiveTimer({ minutes: settings.timers[pomodoroCycle], seconds: 0 });
    }
    setIsActive(true);
  };
  const onPause = () => {
    setIsActive(false);
  };
  const onStop = () => {
    setIsActive(false);
    setActiveTimer(null);
  };

  return (
    <div className="commonWidget">
      <WidgetToolbar title="Pomodoro" id={id} customTools={customTools} />
      <div className={classes.root}>
        <div className={classes.stateChanger}>
          <ButtonGroup size="small">
            <Button
              size="small"
              variant={pomodoroCycle === POMODORO_CYCLES.work ? 'contained' : 'outlined'}
              color="secondary"
              onClick={switchPomodoroState(POMODORO_CYCLES.work)}
              disabled={pomodoroCycle === POMODORO_CYCLES.work}
            >
              Work
            </Button>
            <Button
              size="small"
              variant={pomodoroCycle === POMODORO_CYCLES.break ? 'contained' : 'outlined'}
              color="primary"
              onClick={switchPomodoroState(POMODORO_CYCLES.break)}
              disabled={pomodoroCycle === POMODORO_CYCLES.break}
            >
              Break
            </Button>
          </ButtonGroup>
        </div>
        <div>
          <IconButton size="small" onClick={increaseTimer}>
            <AiOutlinePlus />
          </IconButton>
          <IconButton size="small" onClick={decreaseTimer}>
            <AiOutlineMinus />
          </IconButton>
        </div>
        <Timer timer={activeTimer || timer} total={timer} />
        <div>
          {isActive ? (
            <IconButton onClick={onPause}>
              <MdPause />
            </IconButton>
          ) : (
            <IconButton onClick={onPlay}>
              <MdPlayArrow />
            </IconButton>
          )}
          <IconButton onClick={onStop}>
            <MdStop />
          </IconButton>
        </div>
        {settings.pomodoroCount > 0 && <div>{'🍅'.repeat(settings.pomodoroCount)}</div>}
      </div>
    </div>
  );
}

PomodoroWidget.propTypes = {
  id: PropTypes.string.isRequired,
  settings: PropTypes.shape({
    pomodoroCount: PropTypes.number,
    timers: PropTypes.shape({
      work: PropTypes.number,
      break: PropTypes.number,
      audio: PropTypes.bool,
    }),
  }).isRequired,
};

export default PomodoroWidget;
