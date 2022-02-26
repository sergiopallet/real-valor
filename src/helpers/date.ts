const UNIX_TIMESTAMP_MULTIPLIER = 1000;

export function dateToTimestamp(date: Date): number {
  return Math.floor(date.getTime() / UNIX_TIMESTAMP_MULTIPLIER);
}

export function timestampToDate(timestamp: number): Date {
  return new Date(timestamp * UNIX_TIMESTAMP_MULTIPLIER);
}
