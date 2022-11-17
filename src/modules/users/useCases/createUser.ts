import { Success } from "../core/success";
import { User } from "../domain/user";
import { EmailAlreadyRegisteredFailure } from "./createUserFailures";
import { CreateUserPresenter } from "./createUserPresenter";
import { CreateUserRepository } from "./createUserRepository";
import { CreateUserRequest } from "./createUserRequest";
import { CreateUserResponse } from "./createUserResponse";

export class CreateUserUseCase {
  constructor(
    private readonly repository: CreateUserRepository,
    private readonly presenter: CreateUserPresenter
  ) {}

  async execute(request: CreateUserRequest): Promise<void> {
    const { email } = request;

    const getUserByEmailResult = await this.repository.getUserByEmail(email);
    if (getUserByEmailResult.ok) {
      return this.toPresenter(new EmailAlreadyRegisteredFailure());
    }

    const userResult = User.create(request);
    if (!userResult.ok) {
      return this.toPresenter(userResult);
    }

    const userModel = userResult.value.props;
    await this.repository.save(userModel);

    return this.toPresenter(new Success<string>("User created"));
  }

  private toPresenter(response: CreateUserResponse) {
    this.presenter.execute(response);
  }
}
