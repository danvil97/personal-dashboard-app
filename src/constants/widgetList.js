export const NOTE_WIDGET = 'Note';
export const TODO_WIDGET = 'ToDo';
export const CURRENT_WEATHER_WIDGET = 'CurrentWeather';
export const POMODORO_WIDGET = 'Pomodoro';
export const QUICK_LINKS_WIDGET = 'Quick Links';

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
  {
    name: POMODORO_WIDGET,
    gridSettings: { w: 1, h: 2, minW: 1, minH: 2, maxW: 1, maxH: 2 },
    settings: {
      pomodoroCount: 0,
      timers: { work: 25, break: 5 },
      audio: true,
    },
  },
  {
    name: QUICK_LINKS_WIDGET,
    gridSettings: { w: 1, h: 2, minW: 1, minH: 2, maxW: 1, maxH: 4 },
    links: [
      { url: 'https://google.com', name: 'Google' },
      { url: 'https://yandex.ru', name: 'Yandex' },
    ],
  },
];
