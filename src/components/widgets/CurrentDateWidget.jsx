import React, { useState, useEffect } from 'react';

function CurrentDateWidget() {
  const [date, setDate] = useState(new Date().toLocaleString());
  useEffect(() => {
    const dateTimer = setInterval(() => {
      setDate(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(dateTimer);
  }, []);
  return <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{date}</div>;
}

export default CurrentDateWidget;
