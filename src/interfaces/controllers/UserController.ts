import { Request, Response, NextFunction } from 'express';
import { CreateUserUseCase } from '@application/use-cases/CreateUserUseCase';
import { UserService } from '@application/services/UserService';
import { NotFoundError } from '@shared/errors/AppError';
import { z } from 'zod';
import { injectable, inject } from 'tsyringe';

@injectable()
export class UserController {
  constructor(
    @inject(CreateUserUseCase) private createUserUseCase: CreateUserUseCase,
    @inject(UserService) private userService: UserService
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { user } = await this.createUserUseCase.execute(req.body);
      res.status(201).json({ status: 'success', data: { user } });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await this.userService.getUserById(req.params.id);
      
      if (!user) {
        throw new NotFoundError(`User with ID ${req.params.id} not found`);
      }
      
      res.status(200).json({ status: 'success', data: { user } });
    } catch (error) {
      next(error);
    }
  }
}
