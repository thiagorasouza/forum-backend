import { Result } from "../other/result";

export class UserPassword {
  private static minLength = 6;
  private static maxLength = 32;
  private readonly _value: string;

  private constructor(password: string) {
    this._value = password;
  }

  public get value(): string {
    return this._value;
  }

  private static isValid(password: string): boolean {
    if (
      password.length < UserPassword.minLength ||
      password.length > UserPassword.maxLength
    ) {
      return false;
    }

    return true;
  }

  public static create(password: string): Result<UserPassword> {
    if (!UserPassword.isValid(password)) {
      return Result.fail<UserPassword>("Password is not valid");
    }

    return Result.succeed<UserPassword>(new UserPassword("password"));
  }
}
