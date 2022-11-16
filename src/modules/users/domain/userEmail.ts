import { Result } from "../other/result";

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

  public static create(email: string): Result<UserEmail> {
    if (!UserEmail.isValid(email)) {
      return Result.fail<UserEmail>("Invalid email");
    }

    return Result.succeed<UserEmail>(new UserEmail(email));
  }
}
