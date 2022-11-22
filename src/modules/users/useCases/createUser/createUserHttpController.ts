import { CreateUserUseCase } from "./createUserUseCase";
import { CreateUserHttpRequest } from "./createUserHttpRequest";
import { CreateUserRequestModel } from "./createUserRequestModel";
import { Controller } from "../shared/protocols/controller";

export class CreateUserHttpController implements Controller {
  constructor(private readonly useCase: CreateUserUseCase) {}

  async handle(request: CreateUserHttpRequest): Promise<void> {
    const createUserRequest: CreateUserRequestModel = {
      username: request.body.username,
      email: request.body.email,
      password: request.body.password,
    };

    await this.useCase.execute(createUserRequest);
  }
}
