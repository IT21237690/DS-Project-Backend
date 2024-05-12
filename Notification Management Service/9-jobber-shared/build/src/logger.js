"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.winstonLogger = void 0;
var tslib_1 = require("tslib");
var winston_1 = tslib_1.__importDefault(require("winston"));
var winston_elasticsearch_1 = require("winston-elasticsearch");
var esTransformer = function (logData) {
    return (0, winston_elasticsearch_1.ElasticsearchTransformer)(logData);
};
var winstonLogger = function (elasticsearchNode, name, level) {
    var options = {
        console: {
            level: level,
            handleExceptions: true,
            json: false,
            colorize: true
        },
        elasticsearch: {
            level: level,
            transformer: esTransformer,
            clientOpts: {
                node: elasticsearchNode,
                log: level,
                maxRetries: 2,
                requestTimeout: 10000,
                sniffOnStart: false
            }
        }
    };
    var esTransport = new winston_elasticsearch_1.ElasticsearchTransport(options.elasticsearch);
    var logger = winston_1.default.createLogger({
        exitOnError: false,
        defaultMeta: { service: name },
        transports: [new winston_1.default.transports.Console(options.console), esTransport]
    });
    return logger;
};
exports.winstonLogger = winstonLogger;
//# sourceMappingURL=logger.js.map