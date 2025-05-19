import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "src/server/src/shared/errors/AppError";

export const validateRequest = (schema: z.ZodType<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      // Замена данных в запросе валидированными данными
      req.body = validatedData.body;
      req.query = validatedData.query;
      req.params = validatedData.params;

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        next(
          new BadRequestError(
            `Validation error: ${error.errors
              .map((err) => `${err.path.join(".")}: ${err.message}`)
              .join(", ")}`
          )
        );
      } else {
        next(error);
      }
    }
  };
};
