import { Validator } from "../adapters/validator";
import { Result } from "../other/result";

export class UserEmail {
  private _value = "";

  constructor(private readonly validator: Validator) {}

  get value(): string {
    return this._value;
  }

  create(email: string): Result<UserEmail> {
    if (!this.validator.isEmailValid(email)) {
      return Result.fail<UserEmail>("Invalid email");
    }

    this._value = email;
    return Result.succeed<UserEmail>(this);
  }
}
