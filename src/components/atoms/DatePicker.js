import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const DatePicker = props => {
  return (
    <DayPicker 
      onDayClick={props.handleDateClick}   
    />
  );
};

export default DatePicker;
