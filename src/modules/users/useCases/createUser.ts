import { Success } from "../core/success";
import { User } from "../domain/user";
import {
  ServerFailure,
  EmailAlreadyRegisteredFailure,
} from "./createUserFailures";
import { CreateUserPresenter } from "./createUserPresenter";
import { CreateUserRepository } from "./createUserRepository";
import { CreateUserRequestModel } from "./createUserRequest";
import { CreateUserResponseModel } from "./createUserResponse";

export class CreateUserUseCase {
  constructor(
    private readonly repository: CreateUserRepository,
    private readonly presenter: CreateUserPresenter
  ) {}

  async execute(request: CreateUserRequestModel): Promise<void> {
    const { email } = request;

    try {
      const getUserByEmailResult = await this.repository.getByEmail(email);
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
    } catch (error) {
      return this.toPresenter(new ServerFailure());
    }
  }

  private toPresenter(response: CreateUserResponseModel) {
    this.presenter.execute(response);
  }
}
