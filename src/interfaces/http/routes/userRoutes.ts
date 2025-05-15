import { NextFunction, Request, Response, Router } from 'express';
import { container } from 'tsyringe';
import { UserController } from '@interfaces/controllers/UserController';
import { createUserValidator, getUserValidator } from './userValidation';

const userRouter = Router();

// Попытка получить контроллер из DI контейнера
// Если возникает ошибка, создаем временный контроллер для примера
let userController;
try {
  userController = container.resolve(UserController);
} catch (error) {
  console.warn('UserController не найден в контейнере DI. Используется временная реализация.');
  
  // Временная реализация контроллера для примера
  userController = {
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
    getById: (req: Request, res:Response) => {
      res.status(200).json({
        status: 'success',
        data: {
          user: {
            id: req.params.id,
            name: 'Тестовый пользователь',
            email: 'test@example.com',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        }
      });
    }
  };
}

// Определяем временные валидаторы, если настоящие не существуют
let userValidators;
try {
  const validators = require('./userValidation');
  userValidators = {
    createUserValidator: validators.createUserValidator,
    getUserValidator: validators.getUserValidator
  };
} catch (error) {
  console.warn('Валидаторы не найдены. Используются заглушки.');
  userValidators = {
    createUserValidator: (req: Request, res: Response, next: NextFunction) => next(),
    getUserValidator: (req: Request, res: Response, next: NextFunction) => next()
  };
}

// Маршруты
userRouter.post('/', userValidators.createUserValidator, (req, res, next) => {
  try {
    userController.create(req, res, next);
  } catch (error) {
    next(error);
  }
});

userRouter.get('/:id', userValidators.getUserValidator, (req, res, next) => {
  try {
    userController.getById(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Дополнительные маршруты
userRouter.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      users: [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Иван Иванов',
          email: 'ivan@example.com'
        },
        {
          id: '223e4567-e89b-12d3-a456-426614174000',
          name: 'Мария Петрова',
          email: 'maria@example.com'
        }
      ]
    }
  });
});

export default userRouter;