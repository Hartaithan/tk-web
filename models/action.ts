export interface Action<S = 200, D = Object> {
  status: S;
  data: D;
}
