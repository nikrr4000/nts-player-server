import { NextFunction, Request, Response, Router } from "express";
import { container } from "src/server/src/shared/container";
import { SiteController } from "src/server/src/interfaces/controllers/SiteController";
import logger from "src/server/src/infrastructure/logging/logger";

const siteRouter = Router();

let siteController;
try {
  logger.info("Running default SiteController");
  siteController = container.resolve(SiteController);
} catch (error) {
  console.warn(
    "SiteController не найден в контейнере DI. Используется временная реализация."
  );

  siteController = {
    create: (req: Request, res: Response) => {
      res.status(201).json({
        status: "success",
        data: {
          user: {
            id: crypto.randomUUID(),
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      });
    },
    getByName: (req: Request, res: Response) => {
      res.status(200).json({
        status: "success",
      });
    },
  };
}

let siteValidators;
try {
  const validators = require("./siteValidation");
  siteValidators = {
    createSiteValidator: validators.createSiteValidator,
    getSiteByNameValidator: validators.getSiteValidator,
  };
} catch (error) {
  console.warn("Валидаторы не найдены. Используются заглушки.");
  siteValidators = {
    createUserValidator: (req: Request, res: Response, next: NextFunction) =>
      next(),
    getUserValidator: (req: Request, res: Response, next: NextFunction) =>
      next(),
  };
}

siteRouter.post("/", siteValidators.createSiteValidator, (req, res, next) => {
  try {
    siteController.create(req, res, next);
  } catch (error) {
    next(error);
  }
});

siteRouter.get(
  "/:name",
  siteValidators.getSiteByNameValidator,
  (req, res, next) => {
    try {
      siteController.getByName(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

siteRouter.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
  });
});

export default siteRouter;
