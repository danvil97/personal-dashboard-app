/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { CircularProgress, IconButton, makeStyles } from '@material-ui/core';

import { MdUpdate } from 'react-icons/md';
import { RiWindyLine } from 'react-icons/ri';
import { WiHumidity } from 'react-icons/wi';
import { FaTemperatureLow } from 'react-icons/fa';
import { TiLocationArrowOutline } from 'react-icons/ti';

import WidgetToolbar from '../WidgetToolbar';
import { WeatherAPI } from '../../constants/api';
import { updateWidget } from '../../features/widgetsSlice';
import { locationToString } from '../../utils/weatherUtils';
import { showNotification } from '../../features/notificationSlice';

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
function CurrentWeatherWidget({ id, settings }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const setLocation = (location) => {
    dispatch(
      updateWidget({
        id,
        settings: {
          ...settings,
          location,
        },
      })
    );
  };

  const setLocationUsingGeolocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
    });
    dispatch(
      showNotification({
        message: 'Current Weather widget location was set using geolocation',
        type: 'success',
      })
    );
  };

  const getCurrentWeather = async () => {
    if (settings.location) {
      setIsLoading(true);
      await axios
        .get(
          WeatherAPI.getCurrentWeather(
            `${settings.location.latitude},${settings.location.longitude}`
          )
        )
        .then((res) => {
          const weatherData = {
            temp_c: res.data.current.temp_c,
            temp_f: res.data.current.temp_f,
            humidity: res.data.current.humidity,
            wind_mph: res.data.current.wind_mph,
            wind_kph: res.data.current.wind_kph,
            pressure_mb: res.data.current.pressure_mb,
            pressure_in: res.data.current.pressure_in,
            feelslike_c: res.data.current.feelslike_c,
            feelslike_f: res.data.current.feelslike_f,
            updatedTime: res.data.current.last_updated,
            location: {
              name: res.data.location.name,
              region: res.data.location.region,
              country: res.data.location.country,
            },
            icon: {
              imgSrc: res.data.current.condition.icon,
              text: res.data.current.condition.text,
            },
          };
          setData(weatherData);
          dispatch(
            showNotification({
              message: 'Current Weather updated',
              type: 'success',
            })
          );
        })
        .catch(() => {
          dispatch(
            showNotification({
              message: 'Current Weather widget couldnt retrive data',
              type: 'error',
            })
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    getCurrentWeather();
  }, [settings]);

  const customTools = [
    <IconButton size="small" onClick={setLocationUsingGeolocation} key="0">
      <TiLocationArrowOutline />
    </IconButton>,
  ];

  return (
    <div className="commonWidget">
      <WidgetToolbar id={id} title="Current Weather" customTools={customTools} />
      {isLoading && <CircularProgress />}
      {!settings.location && <div>Please update your location settings!</div>}
      {!isLoading && settings.location && data && (
        <div>
          <div className={classes.rootLoaded}>
            <img src={data.icon.imgSrc} alt={data.icon.text} />
            <p className={classes.temperatureText}>
              {settings.prefferedTemp === 'C' ? `${data.temp_c}°С` : `${data.temp_f}°F`}
            </p>
            <div className={classes.additionalInfo}>
              <div className={classes.property}>
                <FaTemperatureLow size="1.2em" />
                {settings.prefferedTemp === 'C' ? `${data.feelslike_c}°С` : `${data.feelslike_f}°F`}
              </div>
              <div className={classes.property}>
                <RiWindyLine size="1.2em" />
                {settings.speedUnits === 'kph' ? `${data.wind_kph} kph` : `${data.wind_mph} mph`}
              </div>
              <div className={classes.property}>
                <WiHumidity size="1.2em" />
                {data.humidity}%
              </div>
            </div>
          </div>
          <div>
            <p>{locationToString(data.location)}</p>
            <div className={classes.lastUpdated}>
              <MdUpdate onClick={getCurrentWeather} /> {data.updatedTime}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

CurrentWeatherWidget.propTypes = {
  id: PropTypes.string.isRequired,
  settings: PropTypes.shape({
    prefferedTemp: PropTypes.oneOf(['C', 'F']),
    speedUnits: PropTypes.oneOf(['kph', 'mph']),
    location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
  }),
  data: PropTypes.shape({
    temp_c: PropTypes.number,
    temp_f: PropTypes.number,
    humidity: PropTypes.number,
    wind_mph: PropTypes.number,
    wind_kph: PropTypes.number,
    pressure_mb: PropTypes.number,
    pressure_in: PropTypes.number,
    feelslike_c: PropTypes.number,
    feelslike_f: PropTypes.number,
    updatedTime: PropTypes.string,
    location: PropTypes.shape({
      name: PropTypes.string,
      region: PropTypes.string,
      country: PropTypes.string,
    }),
    icon: PropTypes.shape({
      text: PropTypes.string,
      imgSrc: PropTypes.string,
    }),
  }),
};

CurrentWeatherWidget.defaultProps = {
  data: null,
  settings: { prefferedTemp: 'C', speedUnits: 'kph', location: null },
};

export default CurrentWeatherWidget;
