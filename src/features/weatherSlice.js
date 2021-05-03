import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { WeatherAPI } from '../constants/api';

const initialState = {
  city: 'Saint-Petersburg',
  currentData: null,
  isLoading: false,
  hasErrors: false,
};

const weatherSlice = createSlice({
  name: 'weatherAPI',
  initialState,
  reducers: {
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
  getCurrentWeather,
  getCurrentWeatherSuccess,
  getCurrentWeatherFailure,
} = weatherSlice.actions;

export default weatherSlice.reducer;
export const selectCurrentWeatherData = (state) => state.weatherAPI.currentData;
export const selectWeatherStatus = (state) => ({
  isLoading: state.weatherAPI.isLoading,
  hasErorrs: state.weatherAPI.hasErorrs,
});

export function fetchCurrentWeather() {
  return async (dispatch, getState) => {
    const { city } = getState().weatherAPI;
    dispatch(getCurrentWeather());
    await axios
      .get(WeatherAPI.getCurrentWeather(city))
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
  };
}
