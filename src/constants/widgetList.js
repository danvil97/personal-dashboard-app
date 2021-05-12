export const NOTE_WIDGET = 'Note';
export const TODO_WIDGET = 'ToDo';
export const CURRENT_WEATHER_WIDGET = 'CurrentWeather';

export default [
  { name: NOTE_WIDGET, gridSettings: { w: 1, h: 1, minW: 1, minH: 1, maxW: 2, maxH: 4 } },
  {
    name: CURRENT_WEATHER_WIDGET,
    gridSettings: { w: 1, h: 2, minW: 1, minH: 2, maxW: 1, maxH: 2 },
  },
  {
    name: TODO_WIDGET,
    gridSettings: { w: 1, h: 2, minW: 1, minH: 2, maxW: 1, maxH: 2 },
    todoList: [],
  },
];
