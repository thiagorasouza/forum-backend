import { Result } from "../core/result";
import { UserRepository } from "./userRepository";

interface CreateUserRequest {
  email: string;
  password: string;
}

type CreateUserUseCaseReturn = Result<void> | Result<string>;

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(request: CreateUserRequest): Promise<CreateUserUseCaseReturn> {
    const { email, password } = request;
    const getUserByEmailResult = await this.userRepository.getUserByEmail(
      email
    );
    if (getUserByEmailResult.ok) {
      return Result.emailAlreadyRegistered();
    }

    return Result.succeed<string>("User created");
  }
}
