import { Result } from "./result";

export class Success<T> extends Result {
  public readonly ok = true;

  public constructor(public readonly value: T) {
    super();
    Object.freeze(this);
  }
}
