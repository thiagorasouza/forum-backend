import { CreateUserRequestModel, CreateUserUseCase } from "./createUserUseCase";
import { Controller } from "../shared/protocols/controller";

export interface CreateUserHttpRequest {
  body: {
    username: string;
    email: string;
    password: string;
  };
}

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
