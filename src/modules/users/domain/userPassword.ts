import { Failure } from "../core/failure";
import { Success } from "../core/success";

export class UserPassword {
  private static minLength = 6;
  private static maxLength = 32;
  // Letters, numbers and special characters
  private static REGEX = /^[A-z0-9*.!@#$%^&(){}[\]:;<>,.?/~_+\-=|\\]+$/;
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
      password.length > UserPassword.maxLength ||
      !UserPassword.REGEX.test(password)
    ) {
      return false;
    }

    return true;
  }

  public static create(
    password: string
  ): Failure<string> | Success<UserPassword> {
    if (!UserPassword.isValid(password)) {
      return new Failure("Invalid password");
    }

    return new Success(new UserPassword(password));
  }
}
