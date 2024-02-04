export type TError = {
  data: {
    message: boolean;
    stack: string;
    success: boolean;
  };
  status: number;
};

type TSuccess = {
  data?: any;
  message: string;
  success: boolean;
};

export type TResponse = {
  data?: TSuccess;
  error?: TError;
};
