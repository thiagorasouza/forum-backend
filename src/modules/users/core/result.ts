export class Result<T> {
  protected constructor(
    public ok: boolean,
    protected _error?: string,
    protected _value?: T
  ) {
    Object.freeze(this);
  }

  get error(): string {
    if (this.ok) {
      throw new Error(
        "Result.error: unable to get error from successful result"
      );
    }

    return this._error as string;
  }

  get value(): T {
    if (!this.ok) {
      throw new Error("Result.value: unable to get value from failed result");
    }

    return this._value as T;
  }

  static fail<T>(error: string) {
    if (!error) {
      throw new Error("Result.fail: error message must be provided");
    }

    return new Result<T>(false, error, undefined);
  }

  static invalidParam<T>(paramName: string) {
    return Result.fail<T>(`Invalid param: ${paramName}`);
  }

  static succeed<T>(value: T) {
    if (!value) {
      throw new Error("Result.succed: result value must be provided");
    }

    return new Result<T>(true, undefined, value);
  }
}
