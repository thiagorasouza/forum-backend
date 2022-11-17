import { Failure } from "../core/failure";
import { Success } from "../core/success";
import { CreateUserPresenter } from "./createUserPresenter";
import { CreateUserRepository } from "./createUserRepository";
import { CreateUserRequest } from "./createUserRequest";

export class CreateUserUseCase {
  constructor(
    private readonly repository: CreateUserRepository,
    private readonly presenter: CreateUserPresenter
  ) {}

  async execute(request: CreateUserRequest): Promise<void> {
    const { email } = request;
    const getUserByEmailResult = await this.repository.getUserByEmail(email);
    if (getUserByEmailResult.ok) {
      return this.presenter.execute(
        new Failure<string>("Email already registered")
      );
    }

    return this.presenter.execute(new Success<string>("User created"));
  }
}
