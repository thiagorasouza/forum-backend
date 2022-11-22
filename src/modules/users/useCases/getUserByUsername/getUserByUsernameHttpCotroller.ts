import { Controller } from "../shared/protocols/controller";
import { GetUserByUsernameHttpRequest } from "./getUserByUsernameHttpRequest";
import { GetUserByUsernameRequestModel } from "./getUserByUsernameRequestModel";
import { GetUserByUsernameUseCase } from "./getUserByUsernameUseCase";

export class GetUserByUsernameHttpController implements Controller {
  constructor(private readonly useCase: GetUserByUsernameUseCase) {}

  async handle(request: GetUserByUsernameHttpRequest): Promise<void> {
    const getUserRequest: GetUserByUsernameRequestModel = {
      username: request.params.username,
    };
    await this.useCase.execute(getUserRequest);
  }
}
