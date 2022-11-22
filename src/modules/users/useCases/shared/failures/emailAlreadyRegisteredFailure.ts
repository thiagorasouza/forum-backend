import { Failure } from "../../../core/failure";

export class EmailAlreadyRegisteredFailure extends Failure<string> {
  constructor() {
    super("Email already registered");
  }
}
