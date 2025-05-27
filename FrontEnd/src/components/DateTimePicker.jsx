
import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { IconButton } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';


export default function BasicDateTimePicker({ value, onChange }) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        value={value}
        onChange={onChange}
        renderInput={(params) => (
          <IconButton {...params} className="icon-button date-picker-icon">
            <CalendarTodayIcon/>
          </IconButton>
        )}
      />
    </LocalizationProvider>
  );
}

