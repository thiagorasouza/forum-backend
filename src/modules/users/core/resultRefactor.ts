export abstract class Result<T> {
  protected abstract ok: boolean;
  protected abstract value: T;
}
