"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection = __importStar(require("../../queues/connection"));
const email_consumer_1 = require("../../queues/email.consumer");
jest.mock('@notifications/queues/connection');
jest.mock('amqplib');
jest.mock('@yasithadithya/jobber-shared');
describe('Email Consumer', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('consumeAuthEmailMessages method', () => {
        it('should be called', () => __awaiter(void 0, void 0, void 0, function* () {
            const channel = {
                assertExchange: jest.fn(),
                publish: jest.fn(),
                assertQueue: jest.fn(),
                bindQueue: jest.fn(),
                consume: jest.fn(),
            };
            jest.spyOn(channel, 'assertExchange');
            jest.spyOn(channel, 'assertQueue').mockReturnValue({ queue: 'auth-email-queue', messageCount: 0, consumerCount: 0 });
            jest.spyOn(connection, 'createConnection').mockReturnValue(channel);
            const connectionChannel = yield connection.createConnection();
            yield (0, email_consumer_1.consumeAuthEmailMessages)(connectionChannel);
            expect(connectionChannel.assertExchange).toHaveBeenCalledWith('jobber-email-notification', 'direct');
            expect(connectionChannel.assertQueue).toHaveBeenCalledTimes(1);
            expect(connectionChannel.consume).toHaveBeenCalledTimes(1);
            expect(connectionChannel.bindQueue).toHaveBeenCalledWith('auth-email-queue', 'jobber-email-notification', 'auth-email');
        }));
    });
    describe('consumeOrderEmailMessages method', () => {
        it('should be called', () => __awaiter(void 0, void 0, void 0, function* () {
            const channel = {
                assertExchange: jest.fn(),
                publish: jest.fn(),
                assertQueue: jest.fn(),
                bindQueue: jest.fn(),
                consume: jest.fn(),
            };
            jest.spyOn(channel, 'assertExchange');
            jest.spyOn(channel, 'assertQueue').mockReturnValue({ queue: 'order-email-queue', messageCount: 0, consumerCount: 0 });
            jest.spyOn(connection, 'createConnection').mockReturnValue(channel);
            const connectionChannel = yield connection.createConnection();
            yield (0, email_consumer_1.consumeOrderEmailMessages)(connectionChannel);
            expect(connectionChannel.assertExchange).toHaveBeenCalledWith('jobber-order-notification', 'direct');
            expect(connectionChannel.assertQueue).toHaveBeenCalledTimes(1);
            expect(connectionChannel.consume).toHaveBeenCalledTimes(1);
            expect(connectionChannel.bindQueue).toHaveBeenCalledWith('order-email-queue', 'jobber-order-notification', 'order-email');
        }));
    });
});
//# sourceMappingURL=email.consumer.test.js.map