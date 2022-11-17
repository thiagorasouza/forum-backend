import { Failure } from "../core/failure";
import { Success } from "../core/success";
import { InvalidParamFailure } from "./userErrors";

export class UserEmail {
  // W3 Email Regex
  private static REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  private readonly _value: string;

  private constructor(email: string) {
    this._value = email;
  }

  public get value(): string {
    return this._value;
  }

  private static isValid(email: string): boolean {
    return UserEmail.REGEX.test(email);
  }

  public static create(email: string): Failure<string> | Success<UserEmail> {
    if (!UserEmail.isValid(email)) {
      return new InvalidParamFailure("email");
    }

    return new Success<UserEmail>(new UserEmail(email));
  }
}
