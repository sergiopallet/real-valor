export type ChartDataProps = {
  date: string | Date;
  price: number;
  convertedValue?: number;
  initialAmmount?: number;
};

export type ApiProps = {
  date: string;
  prices: number[][];
};

export type CoinSelectOption = {
  title: string;
  value: string;
};
