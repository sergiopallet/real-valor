import { ChartDataProps, ApiProps } from "interfaces";
import moment from "moment";

export const API_BASE_URL = "https://api.coingecko.com/api/v3/";

export const BASE_CURRENCE = "brl";
export const BASE_LOCALE = "pt-br";

export function marketChartUrl(
  currency: string,
  periodInDays: string | number = "1",
  currencyToConvert: string = BASE_CURRENCE
) {
  return (
    API_BASE_URL +
    `coins/${currency}/market_chart?vs_currency=${currencyToConvert}&days=${periodInDays}`
  );
}

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
  return value.toLocaleString(BASE_LOCALE, {
    minimumFractionDigits: fractionDigitis,
    maximumFractionDigits: fractionDigitis,
    currency: BASE_CURRENCE.toUpperCase(),
    style: "currency",
  });
}

export function dateInDaysUntilToday(date: Date) {
  return moment().diff(moment(date), "days");
}
