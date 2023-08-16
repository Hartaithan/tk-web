export interface RegisterPayload {
  national: string;
  phone: string;
}

export interface LoginPayload {
  username: string;
  code: string;
}

export interface LoginSearchParams {
  phone?: string;
}
