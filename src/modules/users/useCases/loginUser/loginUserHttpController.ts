import { Controller } from "../shared/protocols/controller";
import { LoginUserRequestModel, LoginUserUseCase } from "./loginUserUseCase";

export interface LoginUserHttpRequest {
  body: {
    email: string;
    password: string;
  };
}

export class LoginUserHttpController implements Controller {
  constructor(private readonly useCase: LoginUserUseCase) {}

  async handle(request: LoginUserHttpRequest): Promise<void> {
    const requestModel: LoginUserRequestModel = {
      email: request.body.email,
      password: request.body.password,
    };
    await this.useCase.execute(requestModel);
  }
}
