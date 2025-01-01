import { HttpExceptions } from "./root";

export class UnauthorizedException extends HttpExceptions {
  constructor(message: string, errorCode: number, error?: any) {
    super(message, errorCode, 401, error);
  }
}
