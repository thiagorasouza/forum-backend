import { Guard } from "../../core/guard";
import { User } from "../../domain/user";
import { UserData } from "../../domain/userData";
import { UserFailures } from "../../domain/userFailures";
import { EmailAlreadyRegisteredFailure } from "../shared/failures/emailAlreadyRegisteredFailure";
import { ServerFailure } from "../shared/failures/serverFailure";
import { UseCase } from "../shared/protocols/useCase";
import { UserCreatedSuccess } from "../shared/successes/userCreatedSuccess";
import { CreateUserPresenter } from "./createUserPresenter";
import { CreateUserRepository } from "./createUserRepository";

export interface CreateUserRequestModel {
  username: string;
  email: string;
  password: string;
}

export type CreateUserResponseModel =
  | UserCreatedSuccess
  | EmailAlreadyRegisteredFailure
  | UserFailures;

export class CreateUserUseCase implements UseCase {
  constructor(
    protected readonly repository: CreateUserRepository,
    protected readonly presenter: CreateUserPresenter
  ) {}

  async execute(request: CreateUserRequestModel): Promise<void> {
    try {
      const guardResult = Guard.againstNullOrUndefined(request, [
        "username",
        "email",
        "password",
      ]);
      if (!guardResult.ok) {
        return this.toPresenter(guardResult);
      }

      const { username, email, password } = request;

      const getUserByEmailResult = await this.repository.getByEmail(email);
      if (getUserByEmailResult.ok) {
        return this.toPresenter(new EmailAlreadyRegisteredFailure());
      }

      const userData: UserData = { username, email, password };
      const userResult = User.create(userData);
      if (!userResult.ok) {
        return this.toPresenter(userResult);
      }

      const userModel = userResult.value.props;
      await this.repository.create(userModel);

      return this.toPresenter(new UserCreatedSuccess());
    } catch (error) {
      return this.toPresenter(new ServerFailure());
    }
  }

  public toPresenter(response: CreateUserResponseModel) {
    return this.presenter.format(response);
  }
}
