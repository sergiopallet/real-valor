import { ChartDataProps, ApiProps } from "interfaces";
export { timestampToDate, dateToTimestamp } from "./date";

export function paserApiToChartData(data: ApiProps): ChartDataProps[] | [] {
  // if (!data) return [];
  return data?.prices.map((ele: any) => ({
    date: new Date(ele[0]),
    price: ele[1],
  }));
}

export function formatMoney(value: number) {
  return value.toLocaleString("pt-br", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    currency: "BRL",
    style: "currency",
  });
}
