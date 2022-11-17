import { Result } from "./resultRefactor";

export class Success<T> extends Result<T> {
  public readonly ok = true;

  public constructor(public readonly value: T) {
    super();
    Object.freeze(this);
  }
}
