// import { Failure } from "../../core/failure";
// import { Success } from "../../core/success";
// import { InvalidParamFailure } from "../userFailures";

// export abstract class ValueObject {
//   private readonly _value: string;

//   private constructor(value: string) {
//     this._value = value;
//   }

//   public get value(): string {
//     return this._value;
//   }

//   public static create(email: string): Failure<string> | Success<UserEmail> {
//     if (!UserEmail.isValid(email)) {
//       return new InvalidParamFailure("email");
//     }

//     return new Success<UserEmail>(new UserEmail(email));
//   }
// }
