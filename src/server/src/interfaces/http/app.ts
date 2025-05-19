import "reflect-metadata";
import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import { pinoHttp } from "pino-http";
import { errorHandler } from "src/server/src/interfaces/middlewares/errorHandler";
import logger from "src/server/src/infrastructure/logging/logger";
import routes from "src/server/src/interfaces/http/routes";

// Инициализация DI контейнера
import "src/server/src/shared/container";

const app = express();

// Middleware
app.use(pinoHttp({ logger }));
app.use(cors());
app.use(express.json());

// Маршруты
app.use("/api", routes);

// Обработка ошибок
app.use(errorHandler as ErrorRequestHandler);

export default app;
