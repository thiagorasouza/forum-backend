import { Failure } from "../core/failure";

export type UserFailures = InvalidParamFailure;

export class InvalidParamFailure extends Failure<string> {
  constructor(paramName: string) {
    super(`Invalid ${paramName}`);
  }
}
