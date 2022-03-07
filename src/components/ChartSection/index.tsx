import React from "react";
import { Grid, Skeleton } from "@mui/material";
import { Chart } from "components";
import { SC } from "./styled"
import useWindowDimensions from "hooks/useWindowDimensions";
import { ChartDataProps } from "types";

type ChartProps = {
  title: string;
  loading: boolean;
  data: ChartDataProps[];
}

const ChartSection = ({ title, loading, data }: ChartProps) => {
  const [boxWidth, setBoxWidth] = React.useState<number>(0);
  const { height } = useWindowDimensions();
  const gridItemRef = React.useRef<HTMLDivElement>(null);


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

  return (
    <Grid container justifyContent="center">
      <Grid ref={gridItemRef} item xs={12} md={10} lg={8}>
        <SC.MarketHeader>
          <SC.Title>{title}</SC.Title>
        </SC.MarketHeader>
        {loading ? (
          <Skeleton
            variant="text"
            height={Math.floor(height * 0.6)}
            width={boxWidth}
          />
        ) : data?.length ? (
          <Chart
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
        ) : null}
      </Grid>
    </Grid>

  );
}

export default ChartSection;