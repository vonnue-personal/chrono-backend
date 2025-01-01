import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ErrorCodes, HttpExceptions } from "./exceptions/root";
import { UnprocessableEntity } from "./exceptions/validation";
import { InternalException } from "./exceptions/internal-exceptions";

export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error: any) {
      let exceptions: HttpExceptions;
      if (error instanceof HttpExceptions) {
        exceptions = error;
      } else {
        if (error instanceof ZodError) {
          exceptions = new UnprocessableEntity(
            error,
            "Unprocessable Entity",
            ErrorCodes.UNPROCESSABLE_ENTITY
          );
        } else {
          exceptions = new InternalException(
            "Something went wrong!",
            error,
            ErrorCodes.INTERNAL_EXCEPTION
          );
        }
      }
      next(exceptions);
    }
  };
};
