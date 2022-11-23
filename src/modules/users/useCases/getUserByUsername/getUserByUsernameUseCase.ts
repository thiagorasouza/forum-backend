import { Guard } from "../../core/guard";
import { UserFailures } from "../../domain/userFailures";
import { ServerFailure } from "../shared/failures/serverFailure";
import { UserNotFoundFailure } from "../shared/failures/userNotFoundFailure";
import { UserFoundSuccess } from "../shared/successes/userFoundSuccess";
import { GetUserByUsernamePresenter } from "./getUserByUsernamePresenter";
import { GetUserByUsernameRepository } from "./getUserByUsernameRepository";

export interface GetUserByUsernameRequestModel {
  username: string;
}

export type GetUserByUsernameResponseModel =
  | UserFoundSuccess
  | UserNotFoundFailure
  | UserFailures;

export class GetUserByUsernameUseCase {
  constructor(
    private readonly repository: GetUserByUsernameRepository,
    private readonly presenter: GetUserByUsernamePresenter
  ) {}

  async execute(request: GetUserByUsernameRequestModel): Promise<void> {
    try {
      const guardResult = Guard.againstNullOrUndefined(request, ["username"]);
      if (!guardResult.ok) {
        return this.toPresenter(guardResult);
      }

      const { username } = request;
      const getUserByUsernameResult = await this.repository.getByUsername(
        username
      );
      return this.toPresenter(getUserByUsernameResult);
    } catch (error) {
      console.log(error);
      return this.toPresenter(new ServerFailure());
    }
  }

  private toPresenter(response: GetUserByUsernameResponseModel) {
    return this.presenter.format(response);
  }
}
