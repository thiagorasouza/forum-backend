export class Result<T> {
  private constructor(
    public ok: boolean,
    public error?: string,
    public value?: T
  ) {}

  static fail(error: string) {
    return new Result(false, error, undefined);
  }

  static succeed<T>(value: T) {
    return new Result<T>(true, undefined, value);
  }
}
