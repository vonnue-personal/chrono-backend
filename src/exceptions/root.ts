export class HttpExceptions extends Error {
  message: string;
  errorCode: ErrorCodes;
  statusCode: number;
  error: any;

  constructor(
    message: string,
    errorCode: ErrorCodes,
    statusCode: number,
    error: any
  ) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.error = error;
  }
}

export enum ErrorCodes {
  AUTHENTICATION_FAILED = 1000,
  USER_NOT_FOUND = 1001,
  INCORRECT_EMAIL_OR_PASSWORD = 1003,
  PROJECT_NOT_FOUND = 1004,
  ACTIVITY_NOT_FOUND = 1005,
  UNPROCESSABLE_ENTITY = 2001,
  INTERNAL_EXCEPTION = 3001,
  UNAUTHORIZED = 4001,
}
