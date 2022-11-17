import { Result } from "../core/result";
import { UserRepository } from "./userRepository";

interface CreateUserRequest {
  email: string;
  password: string;
}

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(request: CreateUserRequest) {
    const { email, password } = request;
    const getUserByEmailResult = await this.userRepository.getUserByEmail(
      email
    );
    if (getUserByEmailResult.ok) {
      return Result.fail<void>("Email already registered");
    }
  }
}
