import { Validator } from "../adapters/validator";
import { Result } from "../other/result";
import { UserEmailInterface } from "./interfaces/userEmailInterface";

export class UserEmail implements UserEmailInterface {
  private _value = "";

  constructor(private readonly validator: Validator) {}

  get value(): string {
    return this._value;
  }

  private isValid(email: string): boolean {
    return this.validator.isEmailValid(email);
  }

  create(email: string): Result<UserEmail> {
    if (!this.isValid(email)) {
      return Result.fail<UserEmail>("Invalid email");
    }

    this._value = email;
    return Result.succeed<UserEmail>(this);
  }
}
