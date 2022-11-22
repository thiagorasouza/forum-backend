import { Failure } from "../../../core/failure";

export class MissingParamFailure extends Failure<string> {
  constructor(paramName: string) {
    super(`Missing ${paramName}`);
  }
}
