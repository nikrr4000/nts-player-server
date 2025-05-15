import { z } from 'zod';

// Валидатор для пользователя
export const UserValidator = z.object({
  id: z.string().uuid().optional(),
  email: z.string().email(),
  name: z.string().min(2),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Тип, основанный на валидаторе
export type User = z.infer<typeof UserValidator>;

// Фабрика для создания пользователя
export class UserFactory {
  static create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User {
    const now = new Date();
    
    return {
      id: crypto.randomUUID(),
      ...data,
      createdAt: now,
      updatedAt: now,
    };
  }
}
