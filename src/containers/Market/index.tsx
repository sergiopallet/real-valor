import React, { useState } from "react";
// import { Grid, Snackbar, SnackbarCloseReason } from "@material-ui/core";
// import { Skeleton, Alert } from "@material-ui/lab";
import { Grid, Snackbar, SnackbarCloseReason, Skeleton, Alert, TextField } from "@mui/material";
import { DatePicker, MuiPickersAdapter } from '@mui/lab';
import useAxios from "axios-hooks";
import PrimaryChart from "components/PrimaryChart";
import TimeFilterButtons from "components/TimeFilterButtons";
import { SC } from "./styled";
import useWindowDimensions from "hooks/useWindowDimensions";
import { ChartDataProps } from "interfaces";
import { paserApiToChartData } from "helpers";
import { Input } from "components";

const Market = () => {

  const [timeFilter, setTimeFilter] = React.useState<string>("1");
  const [isErrorMessage, setIsErrorMessage] = React.useState<string>("");
  const [boxWidth, setBoxWidth] = React.useState<number>(0);
  const { height } = useWindowDimensions();
  const coinCurrence = "bitcoin";
  const currence = "brl";
  const API_URL = `https://api.coingecko.com/api/v3/coins/${coinCurrence}/market_chart?vs_currency=${currence}&days=${timeFilter}`;
  const [{ data, loading, error }, fetch] = useAxios(
    {
      url: API_URL,
      method: "GET",
    },
    { manual: true }
  );

  const [initialAmmount, setInitialAmmount] = useState("9000");

  const gridItemRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    fetch();
  }, [fetch]);

  React.useEffect(() => {
    if (error) {
      setIsErrorMessage(error.message);
    }
  }, [error]);

  React.useEffect(() => {
    const handleResize = (width?: number) => {
      setBoxWidth(width || 0);
    };

    handleResize(gridItemRef.current?.clientWidth || 0);

    window.addEventListener("resize", () =>
      handleResize(gridItemRef?.current?.clientWidth || 0)
    );

    return () => {
      window.removeEventListener("resize", () => handleResize());
    };
  }, [gridItemRef]);

  const mappedData: ChartDataProps[] | [] = React.useMemo(() => {

    return data ? paserApiToChartData(data, initialAmmount) : [];


  }, [data]);


  const handleError = (
    e: React.SyntheticEvent<any>,
    reason?: SnackbarCloseReason
  ) => {
    setIsErrorMessage("");
  };

  return (
    <Grid container justifyContent="center">
      <Grid ref={gridItemRef} item xs={12} md={10} lg={8}>
        <SC.MarketHeader>
          <SC.Title>{coinCurrence}</SC.Title>
          <TimeFilterButtons
            value={timeFilter}
            onChange={(v) => setTimeFilter(v || "")}
          />
        </SC.MarketHeader>
        {loading ? (
          <Skeleton
            variant="text"
            height={Math.floor(height * 0.6)}
            width={boxWidth}
          />
        ) : mappedData?.length ? (
          <>
            <PrimaryChart
              data={mappedData ?? []}
              height={Math.floor(height * 0.4)}
              width={boxWidth}
              margin={{
                top: 16,
                right: 16,
                bottom: 40,
                left: 48,
              }}
            />
          </>
        ) : null}
        valor:
        <Input
          onChange={(e) => { setInitialAmmount(e.target.value) }}
          value={initialAmmount}
        />
        <button onClick={() => { fetch() }}>Buscar</button>
      </Grid>
      {/* <Snackbar open={!!isErrorMessage} onClose={handleError}>
        <Alert onClose={handleError} severity="error">
          {isErrorMessage}
        </Alert>
      </Snackbar> */}
      <DatePicker
        value={3}
        onChange={(newValue) => { }}
        renderInput={(params) => <TextField {...params} />}
      />
    </Grid>


  );
};

export default Market;
