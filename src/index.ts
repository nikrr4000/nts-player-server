import app from '@interfaces/http/app';
import { config } from '@infrastructure/config';
import logger from '@infrastructure/logging/logger';
import { bootstrap } from '@infrastructure/bootstrap';

const PORT = config.server.port;

bootstrap()

const server = app.listen(PORT, () => {
  logger.info(`Server running in ${config.env} mode on port ${PORT}`);
});

// Обработка необработанных исключений
process.on('uncaughtException', (error) => {
  logger.fatal({ err: error }, 'Uncaught Exception');
  process.exit(1);
});

// Обработка необработанных отклонений промисов
process.on('unhandledRejection', (reason, promise) => {
  logger.fatal({ rejection: reason, promise }, 'Unhandled Rejection');
  server.close(() => {
    process.exit(1);
  });
});

// Корректное завершение работы при SIGTERM
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
  });
});
