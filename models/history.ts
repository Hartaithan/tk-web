export interface HistoryOperation {
  routeNumber: string;
  date: string;
  carNumber: string;
  sum: number;
  type: number;
  checkUrl: string | null;
}

export interface HistoryPageParams {
  id: string;
}
