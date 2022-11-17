import { Failure } from "../core/failure";

export class InvalidParamFailure extends Failure<string> {
  constructor(paramName: string) {
    super(`Invalid ${paramName}`);
  }
}
