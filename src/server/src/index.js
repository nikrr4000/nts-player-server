"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("@interfaces/http/app");
var config_1 = require("@infrastructure/config");
var logger_1 = require("@infrastructure/logging/logger");
var PORT = config_1.config.server.port;
var server = app_1.default.listen(PORT, function () {
    logger_1.default.info("Server running in ".concat(config_1.config.env, " mode on port ").concat(PORT));
});
// Обработка необработанных исключений
process.on('uncaughtException', function (error) {
    logger_1.default.fatal({ err: error }, 'Uncaught Exception');
    process.exit(1);
});
// Обработка необработанных отклонений промисов
process.on('unhandledRejection', function (reason, promise) {
    logger_1.default.fatal({ rejection: reason, promise: promise }, 'Unhandled Rejection');
    server.close(function () {
        process.exit(1);
    });
});
// Корректное завершение работы при SIGTERM
process.on('SIGTERM', function () {
    logger_1.default.info('SIGTERM received. Shutting down gracefully');
    server.close(function () {
        logger_1.default.info('Process terminated');
    });
});
