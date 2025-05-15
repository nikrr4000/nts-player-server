import { User } from '@domain/entities/User';
import { UserService } from '@application/services/UserService';
import { injectable, inject } from 'tsyringe';

interface CreateUserRequest {
  email: string;
  name: string;
}

interface CreateUserResponse {
  user: User;
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject(UserService) private userService: UserService
  ) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const user = await this.userService.createUser({
      email: request.email,
      name: request.name,
    });

    return { user };
  }
}
