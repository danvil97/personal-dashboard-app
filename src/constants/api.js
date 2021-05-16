/* 
! Weather API
? https://www.weatherapi.com/
*/
const WEATHERAPI_BASEURL = 'https://api.weatherapi.com/v1';

export const WeatherAPI = {
  getCurrentWeather: (cityName) =>
    `${WEATHERAPI_BASEURL}/current.json?key=${process.env.REACT_APP_WEATHER_KEY}&q=${cityName}`,
};

/* 
! Currency API
? https://fixer.io/
*/
const CURRENCY_BASEURL = 'http://data.fixer.io/api';

export const CurrencyAPI = {
  getLatest: () => `${CURRENCY_BASEURL}/latest?access_key=${process.env.REACT_APP_CURRENCY_KEY}`,
};

export const placeholder = {};
