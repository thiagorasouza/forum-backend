import { CreateUserUseCase } from "./createUserUseCase";
import { CreateUserHttpRequest } from "./createUserHttpRequest";
import { CreateUserRequestModel } from "./createUserRequestModel";
import { Controller } from "../protocols/controller";

export class CreateUserHttpController implements Controller {
  constructor(private readonly useCase: CreateUserUseCase) {}

  async handle(request: CreateUserHttpRequest): Promise<void> {
    const { name, email, password } = request.body;

    const createUserRequest: CreateUserRequestModel = {
      name,
      email,
      password,
    };

    await this.useCase.execute(createUserRequest);
  }
}
