import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// Импорт validateRequest если он существует, иначе создаем временную функцию
let validateRequest;
try {
  validateRequest = require('@shared/validators/requestValidator').validateRequest;
} catch (error) {
  console.warn('requestValidator не найден. Используется временная реализация.');
  validateRequest = (schema: z.ZodType<any, any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const validatedData = schema.parse({
          body: req.body,
          query: req.query,
          params: req.params,
        });
        
        req.body = validatedData.body;
        req.query = validatedData.query;
        req.params = validatedData.params;
        
        next();
      } catch (error) {
        if (error instanceof z.ZodError) {
          res.status(400).json({
            status: 'error',
            message: `Validation error: ${error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ')}`
          });
        } else {
          next(error);
        }
      }
    };
  };
}

export const createUserValidator = validateRequest(
  z.object({
    body: z.object({
      email: z.string().email('Invalid email format'),
      name: z.string().min(2, 'Name must be at least 2 characters'),
    }),
    query: z.object({}).optional(),
    params: z.object({}).optional(),
  })
);

export const getUserValidator = validateRequest(
  z.object({
    body: z.object({}).optional(),
    query: z.object({}).optional(),
    params: z.object({
      id: z.string().uuid('Invalid user ID format'),
    }),
  })
);