import { InputLabel, MenuItem, Box, SelectChangeEvent, Select } from '@mui/material/';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
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
    <Box >
      <InputLabel id="demo-simple-select-label">Escolha a moeda</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        onChange={(event: SelectChangeEvent) => { handleChange(event.target.value as string) }}
      >
        {HandleOptions(options)}
      </Select>

    </Box >
  );
}

export default CoinSelect;