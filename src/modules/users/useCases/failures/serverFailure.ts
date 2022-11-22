import { Failure } from "../../core/failure";

export class ServerFailure extends Failure<string> {
  constructor() {
    super("Unknown server error");
  }
}
