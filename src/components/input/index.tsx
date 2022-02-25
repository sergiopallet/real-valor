import { InputHTMLAttributes } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
 top: 64px;
 left: 816px;
 width: 414px;
 height: 44px;
 `;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
}

const Input = ({ name, ...rest }: InputProps) => {
  return (<StyledInput id={name} {...rest} />)
}

export default Input;