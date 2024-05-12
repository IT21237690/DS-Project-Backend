import { StatusCodes } from 'http-status-codes';
export class CustomError extends Error {
  constructor(message, comingFrom) {
    super(message);
    this.statusCode = void 0;
    this.status = void 0;
    this.comingFrom = void 0;
    this.comingFrom = comingFrom;
  }
  serializeErrors() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      status: this.status,
      comingFrom: this.comingFrom
    };
  }
}
export class BadRequestError extends CustomError {
  constructor(message, comingFrom) {
    super(message, comingFrom);
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.status = 'error';
  }
}
export class NotFoundError extends CustomError {
  constructor(message, comingFrom) {
    super(message, comingFrom);
    this.statusCode = StatusCodes.NOT_FOUND;
    this.status = 'error';
  }
}
export class NotAuthorizedError extends CustomError {
  constructor(message, comingFrom) {
    super(message, comingFrom);
    this.statusCode = StatusCodes.UNAUTHORIZED;
    this.status = 'error';
  }
}
export class FileTooLargeError extends CustomError {
  constructor(message, comingFrom) {
    super(message, comingFrom);
    this.statusCode = StatusCodes.REQUEST_TOO_LONG;
    this.status = 'error';
  }
}
export class ServerError extends CustomError {
  constructor(message, comingFrom) {
    super(message, comingFrom);
    this.statusCode = StatusCodes.SERVICE_UNAVAILABLE;
    this.status = 'error';
  }
}
//# sourceMappingURL=error-handler.js.map