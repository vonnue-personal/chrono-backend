import { NextFunction, Request, Response } from "express";
import { HttpExceptions } from "../exceptions/root";

export const errorMiddleWare = (
  error: HttpExceptions,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
    errors: error.error,
  });
};
