import { UserRepository } from "./userRepository";

interface CreateUserRequest {
  email: string;
  password: string;
}

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  execute(request: CreateUserRequest) {
    const { email, password } = request;
    this.userRepository.getUserByEmail(email);
  }
}
