import { Response } from 'express';

export const sendSuccess = (res: Response, data: any, message: string = 'Success') => {
  return res.status(200).json({
    success: true,
    message,
    data,
  });
};

export const sendError = (res: Response, status: number, message: string, errors: any[] = []) => {
  return res.status(status).json({
    success: false,
    message,
    errors,
  });
};
