import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

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

export const createSiteValidator = validateRequest(
  z.object({
    body: z.object({
      url: z.string().url('Invalid url structure'),
      name: z.string(),
    }),
  })
);

export const getSiteValidator = validateRequest(
  z.object({
    params: z.object({
      name: z.string().uuid('Invalid site name format'),
    }),
  })
);