import { Failure } from "../core/failure";
import { Success } from "../core/success";
import { InvalidParamFailure } from "../useCases/shared/failures/invalidParamFailure";

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

  public static create(id: string): Failure<string> | Success<UserId> {
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
