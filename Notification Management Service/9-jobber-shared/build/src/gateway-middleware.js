"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyGatewayRequest = void 0;
var tslib_1 = require("tslib");
var jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
var error_handler_1 = require("./error-handler");
var tokens = ['auth', 'seller', 'gig', 'search', 'buyer', 'message', 'order', 'review'];
function verifyGatewayRequest(req, _res, next) {
    var _a, _b;
    if (!((_a = req.headers) === null || _a === void 0 ? void 0 : _a.gatewaytoken)) {
        throw new error_handler_1.NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request not coming from api gateway');
    }
    var token = (_b = req.headers) === null || _b === void 0 ? void 0 : _b.gatewaytoken;
    if (!token) {
        throw new error_handler_1.NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request not coming from api gateway');
    }
    try {
        var payload = jsonwebtoken_1.default.verify(token, '');
        if (!tokens.includes(payload.id)) {
            throw new error_handler_1.NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request payload is invalid');
        }
    }
    catch (error) {
        throw new error_handler_1.NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request not coming from api gateway');
    }
    next();
}
exports.verifyGatewayRequest = verifyGatewayRequest;
//# sourceMappingURL=gateway-middleware.js.map