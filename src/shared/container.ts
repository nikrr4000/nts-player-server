import { container } from 'tsyringe';

// Репозитории
import { UserRepository } from '@domain/repositories/UserRepository';
import { InMemoryUserRepository } from '@infrastructure/repositories/InMemoryUserRepository';

// Сервисы и use-cases
import { UserService } from '@application/services/UserService';
import { CreateUserUseCase } from '@application/use-cases/CreateUserUseCase';

// Регистрация зависимостей
container.registerSingleton<UserRepository>('UserRepository', InMemoryUserRepository);
container.registerSingleton(UserService);
container.registerSingleton(CreateUserUseCase);

export { container };
