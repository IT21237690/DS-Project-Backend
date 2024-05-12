import { StatusCodes } from 'http-status-codes';
export interface IErrorResponse {
    message: string;
    statusCode: number;
    status: string;
    comingFrom: string;
    serializeErrors(): IError;
}
export interface IError {
    message: string;
    statusCode: number;
    status: string;
    comingFrom: string;
}
export declare abstract class CustomError extends Error {
    abstract statusCode: number;
    abstract status: string;
    comingFrom: string;
    constructor(message: string, comingFrom: string);
    serializeErrors(): IError;
}
export declare class BadRequestError extends CustomError {
    statusCode: StatusCodes;
    status: string;
    constructor(message: string, comingFrom: string);
}
export declare class NotFoundError extends CustomError {
    statusCode: StatusCodes;
    status: string;
    constructor(message: string, comingFrom: string);
}
export declare class NotAuthorizedError extends CustomError {
    statusCode: StatusCodes;
    status: string;
    constructor(message: string, comingFrom: string);
}
export declare class FileTooLargeError extends CustomError {
    statusCode: StatusCodes;
    status: string;
    constructor(message: string, comingFrom: string);
}
export declare class ServerError extends CustomError {
    statusCode: StatusCodes;
    status: string;
    constructor(message: string, comingFrom: string);
}
export interface ErrnoException extends Error {
    errno?: number;
    code?: string;
    path?: string;
    syscall?: string;
    stack?: string;
}
