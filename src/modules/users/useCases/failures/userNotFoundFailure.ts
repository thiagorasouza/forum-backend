import { Failure } from "../../core/failure";

export class UserNotFoundFailure extends Failure<string> {
  constructor() {
    super("User not found");
  }
}
