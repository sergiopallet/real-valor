import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { CoinSelectOption } from "types";

type CoinSelectProps = {
  value: string;
  options: CoinSelectOption[];
  handleChange: (v: string) => void;
}

const CoinSelect = ({ value, options, handleChange }: CoinSelectProps) => {

  const HandleOptions = (options: CoinSelectOption[]) => {
    return options.map((option: CoinSelectOption) => <MenuItem key={option.value} value={option.value}>{option.title}</MenuItem>)
  }

  return (
    <Box sx={{ minWidth: 60 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Escolha a moeda</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Age"
          onChange={(event: SelectChangeEvent) => { handleChange(event.target.value as string) }}
        >
          {HandleOptions(options)}
        </Select>
      </FormControl>
    </Box>
  );
}

export default CoinSelect;