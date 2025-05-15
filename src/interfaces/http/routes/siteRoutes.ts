import { NextFunction, Request, Response, Router } from 'express';
import { container } from '@shared/container';
import { SiteController } from '@interfaces/controllers/SiteController';
import logger from '@infrastructure/logging/logger';

const siteRouter = Router();

let siteController;
try {
  logger.info('Running default SiteController')
  siteController = container.resolve(SiteController);
} catch (error) {
  console.warn('SiteController не найден в контейнере DI. Используется временная реализация.');

  siteController = {
    create: (req: Request, res: Response) => {
      res.status(201).json({
        status: 'success',
        data: {
          user: {
            id: crypto.randomUUID(),
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        }
      });
    },
    getByName: (req: Request, res:Response) => {
      res.status(200).json({
        status: 'success',
      });
    }
  };
}

// Определяем временные валидаторы, если настоящие не существуют
let siteValidators;
try {
  const validators = require('./userValidation');
  siteValidators = {
    createSiteValidator: validators.createSiteValidator,
    getSiteValidator: validators.getSiteValidator
  };
} catch (error) {
  console.warn('Валидаторы не найдены. Используются заглушки.');
  siteValidators = {
    createUserValidator: (req: Request, res: Response, next: NextFunction) => next(),
    getUserValidator: (req: Request, res: Response, next: NextFunction) => next()
  };
}

// Маршруты
siteRouter.post('/', /* siteValidators.createSiteValidator, */ (req, res, next) => {
  try {
    siteController.create(req, res, next);
  } catch (error) {
    next(error);
  }
});

siteRouter.get('/:name', /* siteValidators.getSiteValidator,*/ (req, res, next) => {
  try {
    siteController.getByName(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Дополнительные маршруты
siteRouter.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
  });
});

export default siteRouter;