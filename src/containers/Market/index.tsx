import React, { useState } from "react";
import { Grid, Snackbar, SnackbarCloseReason, Skeleton, Alert } from "@mui/material";
import useAxios from "axios-hooks";
import useWindowDimensions from "hooks/useWindowDimensions";
import { ChartDataProps } from "interfaces";
import { dateInDaysUntilToday, marketChartUrl, paserApiToChartData } from "helpers";
import { ChartSection, Input } from "components";
import DatePickerSection from "components/DatePickerSection";

const Market = () => {

  const [isErrorMessage, setIsErrorMessage] = React.useState<string>("");
  const coinCurrence = "bitcoin";
  const [initialAmmount, setInitialAmmount] = useState("1000");
  const [initialDate, setInitialDate] = useState(new Date());
  const [{ data, loading, error }, fetch] = useAxios(
    {
      url: marketChartUrl(coinCurrence, dateInDaysUntilToday(initialDate) || 1)
    },
    { manual: true }
  );

  React.useEffect(() => {
    fetch();
  }, [fetch]);

  React.useEffect(() => {
    if (error) {
      setIsErrorMessage(error.message);
    }
  }, [error]);

  const mappedData: ChartDataProps[] | [] = React.useMemo(() => {

    return data ? paserApiToChartData(data, initialAmmount) : [];

  }, [data]);

  console.log("aaa");
  const handleError = (
    e: React.SyntheticEvent<any>,
    reason?: SnackbarCloseReason
  ) => {
    setIsErrorMessage("");
  };

  return (
    <>
      <ChartSection
        data={mappedData}
        loading={loading}
        title={coinCurrence}
      />
      valor:
      <Input
        onChange={(e) => { setInitialAmmount(e.target.value) }}
        value={initialAmmount}
      />
      <DatePickerSection
        setValue={setInitialDate}
        value={initialDate}
        label={"Data Inicial"}
      />
      <button onClick={() => { fetch() }}> Buscar</button>
    </>

  );
};

{/* <Snackbar open={!!isErrorMessage} onClose={handleError}>
        <Alert onClose={handleError} severity="error">
          {isErrorMessage}
        </Alert>
      </Snackbar> */}

export default Market;
