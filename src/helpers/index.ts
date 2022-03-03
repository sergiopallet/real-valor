import { ChartDataProps, ApiProps } from "interfaces";
export { timestampToDate, dateToTimestamp } from "./date";

export function paserApiToChartData(
  { prices }: ApiProps,
  initialAmmount: any
): ChartDataProps[] {
  const initialCoinPrice = prices[0][1];
  const coinAmmout = initialAmmount / initialCoinPrice;

  return prices.map((ele) => ({
    date: new Date(ele[0]),
    price: coinAmmout * ele[1],
    convertedPrice: coinAmmout * ele[1],
  }));
}

export function formatMoney(value: number, fractionDigitis: number = 2) {
  return value.toLocaleString("pt-br", {
    minimumFractionDigits: fractionDigitis,
    maximumFractionDigits: fractionDigitis,
    currency: "BRL",
    style: "currency",
  });
}
