import { Success } from "../core/success";
import { Identifier } from "./identifier";

export class UserId {
  private readonly _value: string;

  private constructor(id: string) {
    this._value = id;
  }

  public get value(): string {
    return this._value;
  }

  public static create(identifier: Identifier): Success<UserId> {
    const randomId = identifier.generateRandomId();
    return new Success<UserId>(new UserId(randomId));
  }

  public static from(id: string): Success<UserId> {
    return new Success<UserId>(new UserId(id));
  }
}
