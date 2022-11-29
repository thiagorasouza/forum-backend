import { Guard } from "../../core/guard";
import { ServerFailure } from "../shared/failures/serverFailure";
import { UserNotFoundFailure } from "../shared/failures/userNotFoundFailure";
import { UseCase } from "../shared/protocols/useCase";
import { LoginUserPresenter } from "./loginUserPresenter";

export interface LoginUserRequestModel {
  email: string;
  password: string;
}

export type LoginUserResponseModel = UserNotFoundFailure | ServerFailure;

export class LoginUserUseCase implements UseCase {
  constructor(private readonly presenter: LoginUserPresenter) {}

  async execute(request: LoginUserRequestModel): Promise<void> {
    const guardResult = Guard.againstNullOrUndefined(request, [
      "email",
      "password",
    ]);
    if (!guardResult.ok) {
      return this.toPresenter(guardResult);
    }
  }

  toPresenter(response: LoginUserResponseModel): void {
    return this.presenter.format(response);
  }
}
