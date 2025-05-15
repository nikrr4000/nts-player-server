import { User } from '@domain/entities/User';
import { UserRepository } from '@domain/repositories/UserRepository';
import { NotFoundError } from '@shared/errors/AppError';

export class InMemoryUserRepository implements UserRepository {
  private users: Map<string, User> = new Map();

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  }

  async create(user: User): Promise<User> {
    if (!user.id) {
      throw new Error('User must have an ID');
    }
    
    this.users.set(user.id, user);
    return user;
  }

  async update(user: User): Promise<User> {
    if (!user.id) {
      throw new Error('User must have an ID');
    }
    
    if (!this.users.has(user.id)) {
      throw new NotFoundError(`User with ID ${user.id} not found`);
    }
    
    const updatedUser = {
      ...user,
      updatedAt: new Date(),
    };
    
    this.users.set(user.id, updatedUser);
    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    if (!this.users.has(id)) {
      throw new NotFoundError(`User with ID ${id} not found`);
    }
    
    this.users.delete(id);
  }
}
