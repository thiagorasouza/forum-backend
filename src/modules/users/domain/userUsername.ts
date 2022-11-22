import { Failure } from "../core/failure";
import { Success } from "../core/success";
import { InvalidParamFailure } from "../useCases/shared/failures/invalidParamFailure";

export class UserUsername {
  private static minLength = 3;
  private static maxLength = 20;
  // Letters, numbers and special characters
  private static REGEX = /^[A-z0-9]*[A-z]+[A-z0-9]*$/;
  private readonly _value: string;

  private constructor(username: string) {
    this._value = username;
  }

  public get value(): string {
    return this._value;
  }

  private static isValid(username: string): boolean {
    if (
      username.length < UserUsername.minLength ||
      username.length > UserUsername.maxLength ||
      !UserUsername.REGEX.test(username)
    ) {
      return false;
    }

    return true;
  }

  public static create(
    username: string
  ): Failure<string> | Success<UserUsername> {
    if (!UserUsername.isValid(username)) {
      return new InvalidParamFailure("username");
    }

    return new Success(new UserUsername(username));
  }
}
