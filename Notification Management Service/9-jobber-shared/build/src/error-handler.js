"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = exports.FileTooLargeError = exports.NotAuthorizedError = exports.NotFoundError = exports.BadRequestError = exports.CustomError = void 0;
var tslib_1 = require("tslib");
var http_status_codes_1 = require("http-status-codes");
var CustomError = /** @class */ (function (_super) {
    tslib_1.__extends(CustomError, _super);
    function CustomError(message, comingFrom) {
        var _this = _super.call(this, message) || this;
        _this.comingFrom = comingFrom;
        return _this;
    }
    CustomError.prototype.serializeErrors = function () {
        return {
            message: this.message,
            statusCode: this.statusCode,
            status: this.status,
            comingFrom: this.comingFrom,
        };
    };
    return CustomError;
}(Error));
exports.CustomError = CustomError;
var BadRequestError = /** @class */ (function (_super) {
    tslib_1.__extends(BadRequestError, _super);
    function BadRequestError(message, comingFrom) {
        var _this = _super.call(this, message, comingFrom) || this;
        _this.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        _this.status = 'error';
        return _this;
    }
    return BadRequestError;
}(CustomError));
exports.BadRequestError = BadRequestError;
var NotFoundError = /** @class */ (function (_super) {
    tslib_1.__extends(NotFoundError, _super);
    function NotFoundError(message, comingFrom) {
        var _this = _super.call(this, message, comingFrom) || this;
        _this.statusCode = http_status_codes_1.StatusCodes.NOT_FOUND;
        _this.status = 'error';
        return _this;
    }
    return NotFoundError;
}(CustomError));
exports.NotFoundError = NotFoundError;
var NotAuthorizedError = /** @class */ (function (_super) {
    tslib_1.__extends(NotAuthorizedError, _super);
    function NotAuthorizedError(message, comingFrom) {
        var _this = _super.call(this, message, comingFrom) || this;
        _this.statusCode = http_status_codes_1.StatusCodes.UNAUTHORIZED;
        _this.status = 'error';
        return _this;
    }
    return NotAuthorizedError;
}(CustomError));
exports.NotAuthorizedError = NotAuthorizedError;
var FileTooLargeError = /** @class */ (function (_super) {
    tslib_1.__extends(FileTooLargeError, _super);
    function FileTooLargeError(message, comingFrom) {
        var _this = _super.call(this, message, comingFrom) || this;
        _this.statusCode = http_status_codes_1.StatusCodes.REQUEST_TOO_LONG;
        _this.status = 'error';
        return _this;
    }
    return FileTooLargeError;
}(CustomError));
exports.FileTooLargeError = FileTooLargeError;
var ServerError = /** @class */ (function (_super) {
    tslib_1.__extends(ServerError, _super);
    function ServerError(message, comingFrom) {
        var _this = _super.call(this, message, comingFrom) || this;
        _this.statusCode = http_status_codes_1.StatusCodes.SERVICE_UNAVAILABLE;
        _this.status = 'error';
        return _this;
    }
    return ServerError;
}(CustomError));
exports.ServerError = ServerError;
//# sourceMappingURL=error-handler.js.map