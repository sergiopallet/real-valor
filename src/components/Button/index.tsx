import { Button as ButtonMui } from '@mui/material/';
import Stack from '@mui/material/Stack';

type ButtonProps = {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
}
const Button = ({ title, onClick, disabled }: ButtonProps) => {
  return <ButtonMui variant="outlined" onClick={onClick}>{title}</ButtonMui>
}

export default Button;