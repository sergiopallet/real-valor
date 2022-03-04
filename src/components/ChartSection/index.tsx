import React, { useState } from "react";
// import { Grid, Snackbar, SnackbarCloseReason } from "@material-ui/core";
// import { Skeleton, Alert } from "@material-ui/lab";
import { Grid, Snackbar, SnackbarCloseReason, Skeleton, Alert } from "@mui/material";
import { DatePicker, MuiPickersAdapter } from '@mui/lab';

import useAxios from "axios-hooks";
import PrimaryChart from "components/PrimaryChart";
import TimeFilterButtons from "components/TimeFilterButtons";
import { SC } from "./styled"
import useWindowDimensions from "hooks/useWindowDimensions";
import { ChartDataProps } from "interfaces";
import { paserApiToChartData } from "helpers";
import { Input } from "components";
import DatePickerSection from "components/DatePickerSection";

type ChartProps = {
  title: string;
  loading: boolean;
  data: any;
}

const ChartSection = ({ title, loading, data }: ChartProps) => {
  const [isErrorMessage, setIsErrorMessage] = React.useState<string>("");
  const [boxWidth, setBoxWidth] = React.useState<number>(0);
  const [timeFilter, setTimeFilter] = React.useState<string>("30");
  const { height } = useWindowDimensions();
  const gridItemRef = React.useRef<HTMLDivElement>(null);

  const error = "false";

  React.useEffect(() => {
    if (error) {
      setIsErrorMessage("error.message");
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
  console.log("timeFilter:", timeFilter);

  return (
    <Grid container justifyContent="center">
      <Grid ref={gridItemRef} item xs={12} md={10} lg={8}>
        <SC.MarketHeader>
          <SC.Title>{title}</SC.Title>
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
        ) : data?.length ? (
          <>
            <PrimaryChart
              data={data ?? []}
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
      </Grid>
      {/* <Snackbar open={!!isErrorMessage} onClose={handleError}>
        <Alert onClose={handleError} severity="error">
          {isErrorMessage}
        </Alert>
      </Snackbar> */}



    </Grid>

  );
}

export default ChartSection;