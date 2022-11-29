import { Server } from "http";
import { Guard } from "../../core/guard";
import { InvalidPasswordFailure } from "../shared/failures/invalidPasswordFailure";
import { ServerFailure } from "../shared/failures/serverFailure";
import { UserNotFoundFailure } from "../shared/failures/userNotFoundFailure";
import { Encrypter, EncrypterPayload } from "../shared/protocols/encrypter";
import { Hasher } from "../shared/protocols/hasher";
import { UseCase } from "../shared/protocols/useCase";
import { UserLoggedInSuccess } from "../shared/successes/userLoggedInSuccess";
import { LoginUserPresenter } from "./loginUserPresenter";
import { LoginUserRepository } from "./loginUserRepository";

export interface LoginUserRequestModel {
  email: string;
  password: string;
}

export type LoginUserResponseModel =
  | UserLoggedInSuccess
  | UserNotFoundFailure
  | InvalidPasswordFailure
  | ServerFailure;

export class LoginUserUseCase implements UseCase {
  constructor(
    private readonly presenter: LoginUserPresenter,
    private readonly repository: LoginUserRepository,
    private readonly hasher: Hasher,
    private readonly encrypter: Encrypter
  ) {}

  async execute(request: LoginUserRequestModel): Promise<void> {
    try {
      const guardResult = Guard.againstNullOrUndefined(request, [
        "email",
        "password",
      ]);
      if (!guardResult.ok) {
        return this.toPresenter(guardResult);
      }

      const { email, password: submittedPassword } = request;

      const getByEmailResult = await this.repository.getByEmail(email);
      if (!getByEmailResult.ok) {
        return this.toPresenter(getByEmailResult);
      }

      const userModel = getByEmailResult.value;
      const storedPassword = userModel.password.value;

      const compareResult = await this.hasher.compare(
        submittedPassword,
        storedPassword
      );
      if (!compareResult.ok) {
        return this.toPresenter(compareResult);
      }

      const payload: EncrypterPayload = {
        sub: userModel.id.value,
        email: userModel.email.value,
        username: userModel.username.value,
      };
      const token = await this.encrypter.encrypt(payload);

      this.toPresenter(new UserLoggedInSuccess(token));
    } catch (error) {
      this.toPresenter(new ServerFailure());
    }
  }

  toPresenter(response: LoginUserResponseModel): void {
    return this.presenter.format(response);
  }
}
