import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { selectDateTimeUserSettings } from '../../features/userSettingsSlice';

function CurrentDateWidget() {
  const dateTimeSettings = useSelector(selectDateTimeUserSettings);
  const dateTimeFormat = `${dateTimeSettings.showDay ? 'dddd, ' : ''} ${
    dateTimeSettings.showDate ? dateTimeSettings.dateFormat : ''
  } ${dateTimeSettings.showTime ? dateTimeSettings.timeFormat : ''}`;
  const [date, setDate] = useState(moment().format(dateTimeFormat));

  useEffect(() => {
    const dateTimer = setInterval(() => {
      setDate(moment().format(dateTimeFormat));
    }, 1000);

    return () => clearInterval(dateTimer);
  }, [dateTimeFormat]);
  return <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{date}</div>;
}

export default CurrentDateWidget;
