import { Failure } from "../../../core/failure";

export class InvalidPasswordFailure extends Failure<string> {
  constructor() {
    super("Invalid password for this user");
  }
}
