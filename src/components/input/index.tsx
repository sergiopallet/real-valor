

import { TextField } from '@mui/material';

type InputProps = {
  name?: string;
  id?: string;
  value: string;
  label?: string;
  defaultValue?: string;
  onChange: (e: any) => any;
}

const InputText = ({ label, onChange, value, defaultValue, ...rest }: InputProps) => {

  const mask = (currency: any) => {
    let negative = currency.includes('-') ? '-' : '';

    let oneDotRegex = /(\d)(\d{3}),/g;
    let twoDotsRegex = /(\d)(\d{3})(\d{3}),/g;
    let onlyNumbersRegex = /\D/g;

    let masked = currency.replace(onlyNumbersRegex, '');
    masked = (masked / 100).toFixed(2) + '';
    masked = masked.replace('.', ',');
    masked = masked.replace(twoDotsRegex, "$1.$2.$3,");
    masked = masked.replace(oneDotRegex, "$1.$2,");

    return negative + masked;
  }

  const unmask = (currency: any) => {
    currency = currency + '';
    return currency.replace(/\./g, '').replace(',', '.');
  }

  const handleFormatOnChange = (event: any) => {
    const value = mask(event.target.value);
    event.target.value = unmask(value);
    onChange(event);
  }

  return (

    <TextField
      label={label}
      defaultValue={defaultValue}
      onChange={handleFormatOnChange}
      value={mask(value)}
      {...rest}

    />
  )
}

export default InputText;