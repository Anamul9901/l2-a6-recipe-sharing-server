import { Response } from 'express';

type TRespons<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data?: T;
};

const sendResponse = <T>(res: Response, data: TRespons<T>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    messaage: data.message,
    data: data.data,
  });
};

export default sendResponse;
