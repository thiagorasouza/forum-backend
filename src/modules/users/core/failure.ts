import { Result } from "./resultRefactor";

export class Failure<T> extends Result<T> {
  public readonly ok = false;

  public constructor(public readonly value: T) {
    super();
    Object.freeze(this);
  }
}
