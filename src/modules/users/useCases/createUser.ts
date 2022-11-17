import { Result } from "../core/result";
import { CreateUserPresenter } from "./createUserPresenter";
import { CreateUserRepository } from "./createUserRepository";

export interface CreateUserRequest {
  email: string;
  password: string;
}

export type CreateUserResponse = Result<void> | Result<string>;

export class CreateUserUseCase {
  constructor(
    private readonly repository: CreateUserRepository,
    private readonly presenter: CreateUserPresenter
  ) {}

  async execute(request: CreateUserRequest): Promise<void> {
    const { email, password } = request;
    const getUserByEmailResult = await this.repository.getUserByEmail(email);
    if (getUserByEmailResult.ok) {
      return this.presenter.execute(Result.emailAlreadyRegistered());
    }

    return this.presenter.execute(Result.succeed<string>("User created"));
  }
}
