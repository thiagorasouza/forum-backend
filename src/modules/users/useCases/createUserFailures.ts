import { Failure } from "../core/failure";

export class UserNotFoundFailure extends Failure<string> {
  constructor() {
    super("User not found");
  }
}

export class EmailAlreadyRegisteredFailure extends Failure<string> {
  constructor() {
    super("Email already registered");
  }
}
