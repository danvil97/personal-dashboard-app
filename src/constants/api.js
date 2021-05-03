/* 
! Weather API
? https://www.weatherapi.com/

*/
const WEATHERAPI_KEY = 'd1bd5466856d4411ada214841213004';
const WEATHERAPI_BASEURL = 'http://api.weatherapi.com/v1';

export const WeatherAPI = {
  getCurrentWeather: (cityName) =>
    `${WEATHERAPI_BASEURL}/current.json?key=${WEATHERAPI_KEY}&q=${cityName}`,
};

export const placeholder = {};
