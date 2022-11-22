import { Controller } from "../protocols/controller";
import { GetUserByUsernameHttpRequest } from "./getUserByUsernameHttpRequest";
import { GetUserByUsernameRequestModel } from "./getUserByUsernameRequestModel";
import { GetUserByUsernameUseCase } from "./getUserByUsernameUseCase";

export class GetUserByUsernameHttpController implements Controller {
  constructor(private readonly useCase: GetUserByUsernameUseCase) {}

  async handle(request: GetUserByUsernameHttpRequest): Promise<void> {
    const { username } = request.body;
    const getUserRequest: GetUserByUsernameRequestModel = {
      username,
    };
    await this.useCase.execute(getUserRequest);
  }
}
