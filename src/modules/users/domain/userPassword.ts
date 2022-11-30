import { Success } from "../core/success";
import { InvalidParamFailure } from "../useCases/shared/failures/invalidParamFailure";
import { Hasher } from "./hasher";

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

  public static async create(
    rawPassword: string,
    hasher: Hasher
  ): Promise<InvalidParamFailure | Success<UserPassword>> {
    if (!UserPassword.isValid(rawPassword)) {
      return new InvalidParamFailure("password");
    }

    const hashedPassword = await hasher.hash(rawPassword);
    return new Success(new UserPassword(hashedPassword));
  }

  public static from(hashedPassword: string): Success<UserPassword> {
    return new Success(new UserPassword(hashedPassword));
  }
}
