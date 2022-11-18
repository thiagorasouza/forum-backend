import { Sanitizer } from "../../shared/sanitizer";
import { CreateUserRequest } from "./createUserRequest";

interface CreateUserDTO {
  email: string;
  password: string;
}

interface HttpRequest {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: CreateUserDTO;
}

export class CreateUserHttpController {
  constructor(private readonly sanitizer: Sanitizer) {}

  async handle(request: HttpRequest): Promise<void> {
    const { email, password } = request.body;

    const createUserRequest: CreateUserRequest = {
      email: this.sanitizer.sanitize(email),
      password: this.sanitizer.sanitize(password),
    };
  }
}
