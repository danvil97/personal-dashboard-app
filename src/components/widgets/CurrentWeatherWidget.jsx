/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { MdUpdate } from 'react-icons/md';
import { RiWindyLine } from 'react-icons/ri';
import { WiHumidity } from 'react-icons/wi';
import { FaTemperatureLow } from 'react-icons/fa';
import {
  fetchCurrentWeather,
  selectCurrentWeatherData,
  selectWeatherStatus,
  setCurrentLocationViaGeolocation,
  selectCurrentLocation,
} from '../../features/weatherSlice';
import WidgetToolbar from '../WidgetToolbar';

const useStyles = makeStyles(() => ({
  rootLoaded: {
    display: 'flex',
    height: '64px',
    alignItems: 'center',
    overflowY: 'hidden',
    justifyContent: 'space-between',
  },
  temperatureText: {
    fontSize: '32px',
    fontWeight: 'bold',
  },
  lastUpdated: {
    '& > svg': {
      marginRight: '8px',
    },
    display: 'flex',
    alignItems: 'center',
  },
  additionalInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  property: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));
function CurrentWeatherWidget({ id }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const data = useSelector(selectCurrentWeatherData);
  const currentLocation = useSelector(selectCurrentLocation);
  const status = useSelector(selectWeatherStatus);

  const updateData = () => {
    dispatch(fetchCurrentWeather());
  };

  const setLocation = () => {
    dispatch(setCurrentLocationViaGeolocation());
  };

  useEffect(() => {
    dispatch(fetchCurrentWeather());
  }, [dispatch, currentLocation]);

  return (
    <div className="commonWidget">
      <WidgetToolbar title="Current Weather" id={id} onEdit={setLocation} />
      {status.isLoading && <CircularProgress />}
      {!currentLocation && <div>Please update your location settings!</div>}
      {!status.isLoading && data && (
        <div>
          <div className={classes.rootLoaded}>
            <img src={data.icon.img} alt={data.icon.alt} />
            <p className={classes.temperatureText}>{`${data.temp_c}°`}</p>
            <div className={classes.additionalInfo}>
              <div className={classes.property}>
                <FaTemperatureLow size="1.2em" /> {data.feelslike_c}
              </div>
              <div className={classes.property}>
                <RiWindyLine size="1.2em" /> {data.wind_kph}
              </div>
              <div className={classes.property}>
                <WiHumidity size="1.2em" />
                {data.humidity}%
              </div>
            </div>
          </div>
          <div>
            <p>{data.place}</p>
            <div className={classes.lastUpdated}>
              <MdUpdate onClick={updateData} /> {data.updatedTime}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
CurrentWeatherWidget.propTypes = {
  id: PropTypes.string.isRequired,
};
export default CurrentWeatherWidget;
