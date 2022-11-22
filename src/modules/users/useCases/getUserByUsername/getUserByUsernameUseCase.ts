// import { Success } from "../../core/success";
// import { User } from "../../domain/user";
// import { UserData } from "../../domain/userData";
// import { EmailAlreadyRegisteredFailure } from "./createUserFailures";
// import { ServerFailure } from "../failures/serverFailure";
// import { CreateUserPresenter } from "./createUserPresenter";
// import { CreateUserRepository } from "./createUserRepository";
// import { CreateUserRequestModel } from "./createUserRequestModel";
// import { CreateUserResponseModel } from "./createUserResponseModel";

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
    // try {
    const getUserByUsernameResult = await this.repository.getByUsername(
      username
    );
    return this.toPresenter(getUserByUsernameResult);

    // const userModel = getUserByUsernameResult.value;
    //   await this.repository.create(userModel);
    //   return this.toPresenter(new Success<string>("User created"));
    // } catch (error) {
    //   return this.toPresenter(new ServerFailure());
    // }
  }

  private toPresenter(response: GetUserByUsernameResponseModel) {
    return this.presenter.format(response);
  }
}
