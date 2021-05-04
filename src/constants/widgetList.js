export const BASIC_WIDGET = 'Basic';
export const CURRENT_WEATHER_WIDGET = 'CurrentWeather';

export default [
  { name: BASIC_WIDGET, gridSettings: { w: 1, h: 1, minW: 1, minH: 1, maxW: 2, maxH: 2 } },
  {
    name: CURRENT_WEATHER_WIDGET,
    gridSettings: { w: 1, h: 2, minW: 1, minH: 2, maxW: 1, maxH: 2 },
  },
];
