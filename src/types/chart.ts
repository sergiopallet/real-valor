export type ChartDataProps = {
  date: string | Date;
  price: number;
  convertedValue?: number;
};

export type ApiProps = {
  date: string;
  prices: number[][];
};
