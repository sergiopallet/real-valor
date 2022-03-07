import { ChartDataProps, ApiProps } from "types";
import moment from "moment";
import { CoinSelectOption } from "types";

export const BASE_CURRENCE = "brl";
export const BASE_LOCALE = "pt-br";

// url factory
export function marketChartUrl(
  currency: string,
  periodInDays: string | number = 1,
  currencyToConvert: string = BASE_CURRENCE
) {
  return (
    process.env.REACT_APP_API_URL +
    `coins/${currency}/market_chart?vs_currency=${currencyToConvert}&days=${periodInDays}`
  );
}

export function paserApiToChartData(
  { prices }: ApiProps,
  initialAmmount: number
): ChartDataProps[] {
  return prices.map((element: number[]) => {
    return {
      date: new Date(element[0]),
      price: convertCoinPrice(initialAmmount, prices, element[1]),
      initialAmmount: initialAmmount,
    };
  });
}

function convertCoinPrice(
  initialAmmount: number,
  prices: number[][],
  currentPrice: number
) {
  return (initialAmmount / prices[0][1]) * currentPrice;
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

export const coins: CoinSelectOption[] = [
  { title: "Xrp", value: "ripple" },
  { title: "Bitcoin", value: "bitcoin" },
  { title: "ethereum", value: "ethereum" },
];
