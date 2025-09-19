export enum HTTP_METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export interface QueryParams {
  page?: number;
  limit?: number;
}

export interface Response<T> {
  data?: T;
  error?: string;
  message?: string;
}
