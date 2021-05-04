import React from 'react';

import SampleWidget from '../components/widgets/SampleWidget';
import CurrentWeatherWidget from '../components/widgets/CurrentWeatherWidget';

function chooseWidget(name) {
  switch (name) {
    case 'Basic':
      return <SampleWidget />;
    case 'CurrentWeather':
      return <CurrentWeatherWidget />;
    default:
      return null;
  }
}

export default chooseWidget;
