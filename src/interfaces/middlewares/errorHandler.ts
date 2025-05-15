import { Request, Response, NextFunction } from 'express';
import { AppError } from '@shared/errors/AppError';
import logger from '@infrastructure/logging/logger';

export const errorHandler = (
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error instanceof AppError) {
    if (error.isOperational) {
      res.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
      return;
    }
  }

  // Неожиданная ошибка
  logger.error({ 
    err: error,
    req: {
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
    }
  }, 'Unexpected error');

  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};
