import { Guard } from "../../core/guard";
import { ServerFailure } from "../shared/failures/serverFailure";
import { UserNotFoundFailure } from "../shared/failures/userNotFoundFailure";
import { UseCase } from "../shared/protocols/useCase";

export interface LoginUserRequestModel {
  email: string;
  password: string;
}

export type LoginUserResponseModel = UserNotFoundFailure | ServerFailure;

export class LoginUserUseCase implements UseCase {
  async execute(request: LoginUserRequestModel): Promise<void> {
    Guard.againstNullOrUndefined(request, ["email", "password"]);
  }

  toPresenter(response: LoginUserResponseModel): void {
    return;
  }
}
