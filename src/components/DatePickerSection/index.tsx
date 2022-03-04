import { InputHTMLAttributes } from "react";
import DateAdapter from '@mui/lab/AdapterMoment';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import { TextField } from "@mui/material";


interface DatePickerprops {
  name?: string;
  value?: Date;
  label?: string
  setValue: (value: any) => void;
}




const DatePickerSection = ({ value, setValue, label }: DatePickerprops) => {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <DatePicker
        label={label}
        value={value}
        onChange={(newValue) => {
          setValue(newValue)
        }}

        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>

  );
}

export default DatePickerSection;