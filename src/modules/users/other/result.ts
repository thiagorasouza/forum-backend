export class Result {
  private constructor(public ok: boolean, public error: string) {}

  static fail(error: string) {
    return new Result(false, error);
  }
}
