import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TError = {
  data: {
    message: boolean;
    stack: string;
    success: boolean;
  };
  status: number;
};

type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};
export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;
