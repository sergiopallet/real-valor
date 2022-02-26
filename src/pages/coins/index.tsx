import { useState } from "react";
import { Input } from "../../components";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { timestampToDate, dateToTimestamp } from "../../helpers";

const Coins = () => {

  const [value, setValue] = useState<number | string>();
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const setMoneyValue = (value: any) => {
    setValue(value);
  }

  const setDateValue = (date: any) => {
    setStartDate(date)
  }

  const search = () => {
    fetchHistorycalCurrency();
  }

  const BASE_URL = process.env.REACT_APP_API_URL;
  const correncyToSearch = "BTC";
  const currencyResult = "USD";

  const fetchHistorycalCurrency = async () => {
    const data = await fetch(generateApiUrl());
    const dataResponse = await data.json();
    const { TimeFrom, TimeTo, Data } = dataResponse.Data;

    console.log("TimeFrom:", timestampToDate(TimeFrom));
    console.log("TimeTo:", timestampToDate(TimeTo));

    // dataResponse.Data.map((data: any) => {
    //   console.log("data:", data);
    // });


  }

  const generateApiUrl = () => {
    return BASE_URL + `histoday?fsym=${correncyToSearch}&tsym=${currencyResult}&limit=100`;

  };


  return (
    <>
      <h1>coins</h1>
      valor
      <Input value={value} onChange={({ target }) => { setMoneyValue(target.value) }} />
      <br />
      data
      <DatePicker
        selected={startDate}
        onChange={(date) => setDateValue(date)}
      />
      <button onClick={() => search()}>verificar</button>
    </>
  );
}

export default Coins;
