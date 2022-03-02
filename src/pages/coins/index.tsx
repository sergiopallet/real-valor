import { useState } from "react";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { timestampToDate, dateToTimestamp } from "helpers";
import { Input } from "components";

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

  const yearDate = dateToTimestamp(new Date("02/26/2022"));
  const TS = `toTs=${yearDate}`;

  const fetchHistorycalCurrency = async () => {
    const data = await fetch(generateApiUrl());
    const dataResponse = await data.json();
    const { TimeFrom, TimeTo, Data } = dataResponse.Data;

    console.log("TimeFrom:", timestampToDate(TimeFrom));
    console.log("TimeTo:", timestampToDate(TimeTo));

    // Data.map((data: any) => {
    //   console.log("time:", timestampToDate(data.time));
    // });

  }

  const generateApiUrl = () => {
    const url = BASE_URL + `histoday?fsym=${correncyToSearch}&tsym=${currencyResult}&limit=2000&${TS}`;
    const url2 = "https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=100";
    return url2;

  };

  const getApiDataPointsBasedOnDate = (date: Date) => {
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
  }




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
