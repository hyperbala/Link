
import React from 'react';

const DateTime = () => {
  const getCurrentFormattedDate = () => {
    const now = new Date();
    const dayOptions = { weekday: 'short' };
    const monthOptions = { month: 'short' };
    const day = now.toLocaleDateString('en-US', dayOptions);
    const month = now.toLocaleDateString('en-US', monthOptions);
    const date = now.getDate();

    return `${day.toUpperCase()}, ${month.toUpperCase()} ${date}`;
  };

  const getCurrentFormattedTime = () => {
    const now = new Date();
    const timeOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return now.toLocaleTimeString('en-US', timeOptions);
  };

  return (
    <div className='flex gap-2'>
      <div >{getCurrentFormattedTime()}</div>
      <div >{getCurrentFormattedDate()}</div>
    </div>
    
  );
};

export default DateTime;
