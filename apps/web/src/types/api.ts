export interface QueryParams {
  page?: number;
  limit?: number;
}

export interface Response<T> {
  data: T[];
  error?: string;
  message?: string;
}
