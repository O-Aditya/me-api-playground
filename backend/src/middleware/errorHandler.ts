import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

interface ApiError extends Error {
    status?: number;
    code?: string;
}

export const errorHandler = (
    err: ApiError,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    logger.error(`Error: ${err.message}`, { stack: err.stack });

    const status = err.status || 500;
    const code = err.code || 'INTERNAL_ERROR';
    const message = err.message || 'An unexpected error occurred';

    res.status(status).json({
        success: false,
        error: {
            code,
            message,
            status,
        },
    });
};

export class ApiErrorClass extends Error implements ApiError {
    status: number;
    code: string;

    constructor(message: string, status: number = 500, code: string = 'INTERNAL_ERROR') {
        super(message);
        this.status = status;
        this.code = code;
        this.name = 'ApiError';
    }
}

// Helper functions for common errors
export const notFound = (resource: string) =>
    new ApiErrorClass(`${resource} not found`, 404, 'RESOURCE_NOT_FOUND');

export const validationError = (message: string) =>
    new ApiErrorClass(message, 400, 'VALIDATION_ERROR');

export const unauthorized = () =>
    new ApiErrorClass('Unauthorized access', 401, 'UNAUTHORIZED');

export const conflict = (message: string) =>
    new ApiErrorClass(message, 409, 'CONFLICT');
