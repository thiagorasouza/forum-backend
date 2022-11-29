import { Guard } from "../../core/guard";
import { ServerFailure } from "../shared/failures/serverFailure";
import { UserNotFoundFailure } from "../shared/failures/userNotFoundFailure";
import { UseCase } from "../shared/protocols/useCase";
import { LoginUserPresenter } from "./loginUserPresenter";
import { LoginUserRepository } from "./loginUserRepository";

export interface LoginUserRequestModel {
  email: string;
  password: string;
}

export type LoginUserResponseModel = UserNotFoundFailure | ServerFailure;

export class LoginUserUseCase implements UseCase {
  constructor(
    private readonly presenter: LoginUserPresenter,
    private readonly repository: LoginUserRepository
  ) {}

  async execute(request: LoginUserRequestModel): Promise<void> {
    const guardResult = Guard.againstNullOrUndefined(request, [
      "email",
      "password",
    ]);
    if (!guardResult.ok) {
      return this.toPresenter(guardResult);
    }

    const { email, password } = request;

    const getByEmailResult = await this.repository.getByEmail(email);
    if (!getByEmailResult.ok) {
      return this.toPresenter(getByEmailResult);
    }
  }

  toPresenter(response: LoginUserResponseModel): void {
    return this.presenter.format(response);
  }
}
