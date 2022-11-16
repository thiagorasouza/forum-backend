export class Result<T> {
  private constructor(
    public ok: boolean,
    public error?: string,
    public value?: T
  ) {
    Object.freeze(this);
  }

  static fail<T>(error: string) {
    return new Result<T>(false, error, undefined);
  }

  static succeed<T>(value: T) {
    return new Result<T>(true, undefined, value);
  }
}
