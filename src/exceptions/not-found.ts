import { ErrorCodes, HttpExceptions } from "./root";

export class NotFoundException extends HttpExceptions {
  constructor(message: string, errorCode: ErrorCodes) {
    super(message, errorCode, 404, null);
  }
}
