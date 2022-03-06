import React from 'react';
import styles from './InputCurrency.module.css';
import PropTypes from 'prop-types';
// import InputErrorMessage from './../InputErrorMessage/InputErrorMessage';
// import { InputGroup } from './../';

/**
 * Input for currency values
 * 
 * @prop {Function} onChange
 * @prop {String} name
 * @prop {String} className
 * @prop {String} value
 * @prop {String} label
 * @prop {Number} maxLength
 * @prop {String} placeholder
 * @prop {Boolean} disabled
 * @prop {String} errorMessage
 */
const InputCurrency = ({
  onChange,
  name,
  className,
  value,
  label,
  maxLength,
  placeholder,
  disabled,
  valid,
  errorMessage,
  refCallback
}: any) => {

  /**
   * Mask as number as currency
   * 
   * @param {String} currency 
   */
  const mask = (currency: any) => {

    /**
     * Due to onlyNumbersRegex replace the minus sign with empty value, 
     * this is needed.
     */
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

  /**
   * Unmask as number from currency format
   * 
   * @param {String} currency 
   */
  const unmask = (currency: any) => {
    currency = currency + '';
    return currency.replace(/\./g, '').replace(',', '.');
  }

  /**
   * Remove mask from value before update state
   * 
   * @param {String} currency 
   */
  const handleFormatOnChange = (event: any) => {
    const value = mask(event.target.value);
    event.target.value = unmask(value);
    onChange(event);
  }

  return (
    // <InputGroup>
    <>
      <label>{label}</label>
      <input
        type='text'
        onChange={handleFormatOnChange}
        name={name}
        value={mask(value)}
        className={`${styles.inputCurrency} ${className}`}
        maxLength={maxLength}
        placeholder={placeholder}
        disabled={disabled}
        step='0.1'
        ref={refCallback}
      />
      {/* {!valid && <InputErrorMessage>{errorMessage}</InputErrorMessage>} */}
      {/* </InputGroup> */}
    </>
  );
}

InputCurrency.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  valid: PropTypes.bool,
  errorMessage: PropTypes.string,
  refCallback: PropTypes.func
}

InputCurrency.defaultProps = {
  className: '',
  label: '',
  maxLength: 15,
  placeholder: '',
  disabled: false,
  valid: true,
  errorMessage: '',
  refCallback: () => ({})
};

export default InputCurrency;