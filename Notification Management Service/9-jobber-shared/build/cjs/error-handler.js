"use strict";

exports.__esModule = true;
exports.ServerError = exports.NotFoundError = exports.NotAuthorizedError = exports.FileTooLargeError = exports.CustomError = exports.BadRequestError = void 0;
var _httpStatusCodes = require("http-status-codes");
class CustomError extends Error {
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
exports.CustomError = CustomError;
class BadRequestError extends CustomError {
  constructor(message, comingFrom) {
    super(message, comingFrom);
    this.statusCode = _httpStatusCodes.StatusCodes.BAD_REQUEST;
    this.status = 'error';
  }
}
exports.BadRequestError = BadRequestError;
class NotFoundError extends CustomError {
  constructor(message, comingFrom) {
    super(message, comingFrom);
    this.statusCode = _httpStatusCodes.StatusCodes.NOT_FOUND;
    this.status = 'error';
  }
}
exports.NotFoundError = NotFoundError;
class NotAuthorizedError extends CustomError {
  constructor(message, comingFrom) {
    super(message, comingFrom);
    this.statusCode = _httpStatusCodes.StatusCodes.UNAUTHORIZED;
    this.status = 'error';
  }
}
exports.NotAuthorizedError = NotAuthorizedError;
class FileTooLargeError extends CustomError {
  constructor(message, comingFrom) {
    super(message, comingFrom);
    this.statusCode = _httpStatusCodes.StatusCodes.REQUEST_TOO_LONG;
    this.status = 'error';
  }
}
exports.FileTooLargeError = FileTooLargeError;
class ServerError extends CustomError {
  constructor(message, comingFrom) {
    super(message, comingFrom);
    this.statusCode = _httpStatusCodes.StatusCodes.SERVICE_UNAVAILABLE;
    this.status = 'error';
  }
}
exports.ServerError = ServerError;
//# sourceMappingURL=error-handler.js.map