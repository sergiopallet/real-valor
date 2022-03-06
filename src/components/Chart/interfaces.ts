import { ChartDataProps } from "types";

export interface PrimaryChartProps {
  data: ChartDataProps[];
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
}

export type TooltipData = ChartDataProps;
