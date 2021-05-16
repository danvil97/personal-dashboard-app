import React from 'react';
import PropTypes from 'prop-types';
import { LinearProgress, makeStyles } from '@material-ui/core';
import { calculateProgrss } from '../../../utils/pomodoroUtils';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  timerText: { fontSize: '36px' },
  progressBar: {
    width: '100%',
  },
}));

function Timer({ timer, total }) {
  const classes = useStyles();
  const timerMinutes = timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes;
  const timerSeconds = timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds;

  return (
    <div className={classes.root}>
      <div className={classes.timerText}>
        {timerMinutes}:{timerSeconds}
      </div>
      <LinearProgress
        className={classes.progressBar}
        variant="determinate"
        value={calculateProgrss(total, timer)}
      />
    </div>
  );
}

Timer.propTypes = {
  timer: PropTypes.shape({ minutes: PropTypes.number, seconds: PropTypes.number }).isRequired,
  total: PropTypes.shape({ minutes: PropTypes.number, seconds: PropTypes.number }).isRequired,
};

export default Timer;
