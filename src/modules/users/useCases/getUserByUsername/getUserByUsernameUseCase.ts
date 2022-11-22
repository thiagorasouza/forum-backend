import { ServerFailure } from "../shared/failures/serverFailure";
import { GetUserByUsernamePresenter } from "./getUserByUsernamePresenter";
import { GetUserByUsernameRepository } from "./getUserByUsernameRepository";
import { GetUserByUsernameRequestModel } from "./getUserByUsernameRequestModel";
import { GetUserByUsernameResponseModel } from "./getUserByUsernameResponseModel";

export class GetUserByUsernameUseCase {
  constructor(
    private readonly repository: GetUserByUsernameRepository,
    private readonly presenter: GetUserByUsernamePresenter
  ) {}

  async execute(request: GetUserByUsernameRequestModel): Promise<void> {
    const { username } = request;
    try {
      const getUserByUsernameResult = await this.repository.getByUsername(
        username
      );
      return this.toPresenter(getUserByUsernameResult);
    } catch (error) {
      return this.toPresenter(new ServerFailure());
    }
  }

  private toPresenter(response: GetUserByUsernameResponseModel) {
    return this.presenter.format(response);
  }
}
