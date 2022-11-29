import { Failure } from "../core/failure";
import { Success } from "../core/success";
import { InvalidParamFailure } from "../useCases/shared/failures/invalidParamFailure";
import { Identifier } from "./identifier";

export class UserId {
  private readonly _value: string;

  private constructor(id: string) {
    this._value = id;
  }

  public get value(): string {
    return this._value;
  }

  public static create(
    id: string | null,
    identifier: Identifier
  ): Failure<string> | Success<UserId> {
    if (!id) {
      const randomId = identifier.generateRandomId();
      return new Success<UserId>(new UserId(randomId));
    }

    const isIdValid = identifier.isIdValid(id);
    if (!isIdValid) {
      return new InvalidParamFailure("id");
    }

    return new Success<UserId>(new UserId(id));
  }
}
