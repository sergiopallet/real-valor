import React from "react";
import { DataProps } from "interfaces/DataProps";
import AreaChart from "components/AreaChart";
import { scaleLinear, scaleTime } from "@visx/scale";
import { LinearGradient } from "@visx/gradient";
import { Brush } from "@visx/brush";
import BaseBrush from "@visx/brush/lib/BaseBrush";
import { Bounds } from "@visx/brush/lib/types";
import { max, min, extent } from "d3-array";
import { ColorsEnum, theme } from "styles";
import { MarketContext } from "store/MarketProvider";
import { SecondaryChartProps } from "./interfaces";



const SecondaryChart: React.FC<SecondaryChartProps> = ({
  data,
  width = 10,
  height,
  margin = { top: 0, right: 0, bottom: 0, left: 0 },
}) => {
  const {
    filteredDataState: { setFilteredData },
  } = React.useContext(MarketContext);


  React.useEffect(() => {
    if (data.length) {
      setFilteredData(data);
    }
  }, [data, setFilteredData]);



  return (
    <div style={{ position: "relative" }}>

    </div>
  );
};

export default SecondaryChart;
