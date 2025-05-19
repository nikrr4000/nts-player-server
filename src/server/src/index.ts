import app from "src/server/src/interfaces/http/app";
import { config } from "src/server/src/infrastructure/config";
import logger from "src/server/src/infrastructure/logging/logger";
import { bootstrap } from "src/server/src/infrastructure/bootstrap";

const PORT = config.server.port;

bootstrap();

const server = app.listen(PORT, () => {
  logger.info(`Server running in ${config.env} mode on port ${PORT}`);
});

// Обработка необработанных исключений
process.on("uncaughtException", (error) => {
  logger.fatal({ err: error }, "Uncaught Exception");
  process.exit(1);
});

// Обработка необработанных отклонений промисов
process.on("unhandledRejection", (reason, promise) => {
  logger.fatal({ rejection: reason, promise }, "Unhandled Rejection");
  server.close(() => {
    process.exit(1);
  });
});

// Корректное завершение работы при SIGTERM
process.on("SIGTERM", () => {
  logger.info("SIGTERM received. Shutting down gracefully");
  server.close(() => {
    logger.info("Process terminated");
  });
});
