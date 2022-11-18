import { Sanitizer } from "../../shared/sanitizer";
import { CreateUserUseCase } from "./createUser";
import { CreateUserHttpRequest } from "./createUserHttpRequest";
import { CreateUserRequestModel } from "./createUserRequest";

export class CreateUserHttpController {
  constructor(
    private readonly useCase: CreateUserUseCase,
    private readonly sanitizer: Sanitizer
  ) {}

  async handle(request: CreateUserHttpRequest): Promise<void> {
    const { email, password } = request.body;

    const createUserRequest: CreateUserRequestModel = {
      email: this.sanitizer.sanitize(email),
      password: this.sanitizer.sanitize(password),
    };

    this.useCase.execute(createUserRequest);
  }
}
