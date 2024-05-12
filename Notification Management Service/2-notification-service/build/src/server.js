"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
require("express-async-errors");
const http_1 = __importDefault(require("http"));
const jobber_shared_1 = require("@yasithadithya/jobber-shared");
const config_1 = require("./config");
const routes_1 = require("./routes");
const elasticsearch_1 = require("./elasticsearch");
const connection_1 = require("./queues/connection");
const email_consumer_1 = require("./queues/email.consumer");
const SERVER_PORT = 4001;
const log = (0, jobber_shared_1.winstonLogger)(`${config_1.config.ELASTIC_SEARCH_URL}`, 'notificationServer', 'debug');
function start(app) {
    startServer(app);
    app.use('', (0, routes_1.healthRoutes)());
    startQueues();
    startElasticSearch();
}
exports.start = start;
function startQueues() {
    return __awaiter(this, void 0, void 0, function* () {
        const emailChannel = yield (0, connection_1.createConnection)();
        yield (0, email_consumer_1.consumeAuthEmailMessages)(emailChannel);
        yield (0, email_consumer_1.consumeOrderEmailMessages)(emailChannel);
    });
}
function startElasticSearch() {
    (0, elasticsearch_1.checkConnection)();
}
function startServer(app) {
    try {
        const httpServer = new http_1.default.Server(app);
        log.info(`Worker with process id of ${process.pid} on notification server has started`);
        httpServer.listen(SERVER_PORT, () => {
            log.info(`Notification server running on port ${SERVER_PORT}`);
        });
    }
    catch (error) {
        log.log('error', 'NotificationService startServer() method:', error);
    }
}
//# sourceMappingURL=server.js.map