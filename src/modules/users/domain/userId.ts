import { Failure } from "../core/failure";
import { Success } from "../core/success";
import { InvalidParamFailure } from "../useCases/shared/failures/invalidParamFailure";
import { Identifier } from "./identifier";

type UserIdResult = Failure<string> | Success<UserId>;

export class UserId {
  private readonly _value: string;

  private constructor(id: string) {
    this._value = id;
  }

  public get value(): string {
    return this._value;
  }

  // private static isValid(username: string): boolean {
  //   return;
  // }

  public static create(id: string, identifier: Identifier): UserIdResult {
    identifier.isIdValid(id);
    return new InvalidParamFailure("id");
  }

  // public static create(id: string): Failure<string> | Success<UserId> {
  //   return;
  //   // if (!UserUsername.isValid(username)) {
  //   //   return new InvalidParamFailure("username");
  //   // }
  //   // return new Success(new UserUsername(username));
  // }
}
