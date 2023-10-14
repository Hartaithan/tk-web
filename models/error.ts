export interface Error {
  errorMessage: string;
  exceptionMessage: string;
  exceptionSource: string;
}

export interface FieldError {
  errors: Error[];
}
