"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const router = express_1.default.Router();
function healthRoutes() {
    router.get('/notification-health', (_req, res) => {
        res.status(http_status_codes_1.StatusCodes.OK).send('Notification service is healthy and OK.');
    });
    return router;
}
exports.healthRoutes = healthRoutes;
//# sourceMappingURL=routes.js.map