import 'reflect-metadata';
import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import { pinoHttp } from 'pino-http';
import { errorHandler } from '@interfaces/middlewares/errorHandler';
import logger from '@infrastructure/logging/logger';
import routes from '@interfaces/http/routes';

// Инициализация DI контейнера
import '@shared/container';

const app = express();

// Middleware
app.use(pinoHttp({ logger }));
app.use(cors());
app.use(express.json());

// Маршруты
app.use('/api', routes);

// Обработка ошибок
app.use(errorHandler as ErrorRequestHandler);

export default app;
