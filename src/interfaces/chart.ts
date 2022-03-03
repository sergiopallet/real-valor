export interface ChartDataProps {
  date: string | Date;
  price: number;
  convertedValue?: number;
}

type Price = number[];

export interface ApiProps {
  date: string;
  prices: Price[];
}
