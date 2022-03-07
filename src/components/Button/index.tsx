import { Button as ButtonMui } from '@mui/material/';


type ButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode
}
const Button = ({ onClick, disabled, children }: ButtonProps) => {
  return <ButtonMui variant="outlined" onClick={onClick} disabled={disabled} >{children}</ButtonMui>
}

export default Button;