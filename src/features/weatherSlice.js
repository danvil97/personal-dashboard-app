import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { WeatherAPI } from '../constants/api';

const initialState = {
  currentLocation: null,
  currentData: null,
  isLoading: false,
  hasErrors: false,
};

const weatherSlice = createSlice({
  name: 'weatherAPI',
  initialState,
  reducers: {
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
    getCurrentWeather: (state) => {
      state.isLoading = true;
    },
    getCurrentWeatherSuccess: (state, action) => {
      state.currentData = action.payload;
      state.isLoading = false;
      state.hasErrors = false;
    },
    getCurrentWeatherFailure: (state) => {
      state.isLoading = false;
      state.hasErrors = true;
    },
  },
});

export const {
  setCurrentLocation,
  getCurrentWeather,
  getCurrentWeatherSuccess,
  getCurrentWeatherFailure,
} = weatherSlice.actions;

export default weatherSlice.reducer;
export const selectCurrentWeatherData = (state) => state.weatherAPI.currentData;
export const selectCurrentLocation = (state) => state.weatherAPI.currentLocation;
export const selectWeatherStatus = (state) => ({
  isLoading: state.weatherAPI.isLoading,
  hasErorrs: state.weatherAPI.hasErorrs,
});

export function fetchCurrentWeather() {
  return async (dispatch, getState) => {
    const { currentLocation } = getState().weatherAPI;
    if (currentLocation) {
      dispatch(getCurrentWeather());
      await axios
        .get(
          WeatherAPI.getCurrentWeather(`${currentLocation.latitude},${currentLocation.longitude}`)
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
            place: `${res.data.location.country}, ${res.data.location.name}`,
            icon: { img: res.data.current.condition.icon, alt: res.data.current.condition.text },
          };
          dispatch(getCurrentWeatherSuccess(weatherData));
        })
        .catch(() => {
          dispatch(getCurrentWeatherFailure());
        });
    }
  };
}
export function setCurrentLocationViaGeolocation() {
  return async (dispatch) => {
    const { geolocation } = navigator;
    geolocation.getCurrentPosition((position) => {
      dispatch(
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      );
    });
  };
}
