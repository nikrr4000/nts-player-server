import { User, UserFactory } from '@domain/entities/User';
import { UserRepository } from '@domain/repositories/UserRepository';
import { BadRequestError } from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

@injectable()
export class UserService {
  constructor(
    @inject('UserRepository') private userRepository: UserRepository
  ) {}

  async createUser(userData: Pick<User, 'email' | 'name'>): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    
    if (existingUser) {
      throw new BadRequestError(`User with email ${userData.email} already exists`);
    }
    
    const user = UserFactory.create(userData);
    return this.userRepository.create(user);
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}
