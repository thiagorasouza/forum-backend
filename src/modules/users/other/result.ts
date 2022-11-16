export class Result<T> {
  private constructor(
    public ok: boolean,
    public error: string | null,
    public value: T
  ) {}

  static fail(error: string) {
    return new Result(false, error, null);
  }

  static succeed<T>(value: T) {
    return new Result(true, null, value);
  }
}
