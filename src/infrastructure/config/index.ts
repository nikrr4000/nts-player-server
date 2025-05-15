import { z } from 'zod';
import dotenv from 'dotenv';

// Загрузка переменных окружения
dotenv.config();

// Схема валидации для переменных окружения
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(val => parseInt(val, 10)).default('3000'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

// Валидация и получение переменных окружения
const envVars = envSchema.parse(process.env);

// Конфигурация приложения
export const config = {
  env: envVars.NODE_ENV,
  isProduction: envVars.NODE_ENV === 'production',
  server: {
    port: envVars.PORT,
  },
  logging: {
    level: envVars.LOG_LEVEL,
  },
};

export * from "./defaultSites"