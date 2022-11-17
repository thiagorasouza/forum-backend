import { Result } from "./result";

export class Failure<T> extends Result {
  public readonly ok = false;

  public constructor(public readonly error: T) {
    super();
    Object.freeze(this);
  }
}
