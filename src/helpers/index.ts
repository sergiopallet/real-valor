import { ChartDataProps, ApiProps } from "types";
import moment from "moment";

export const API_BASE_URL = "https://api.coingecko.com/api/v3/";

export const BASE_CURRENCE = "brl";
export const BASE_LOCALE = "pt-br";

// url factory
export function marketChartUrl(
  currency: string,
  periodInDays: string | number = 1,
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
  const initialCoinPrice = prices[0][1]; // criar função separada
  const coinAmmout = initialAmmount / initialCoinPrice;
  return prices.map((element: number[]) => ({
    date: new Date(element[0]),
    price: coinAmmout * element[1],
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

type CoinSelect = {
  title: string;
  value: string;
};

export const coins: CoinSelect[] = [
  { title: "xrp", value: "xrp" },
  { title: "bitcoins", value: "bitcoins" },
  { title: "etherium", value: "etherium" },
];

// testes
