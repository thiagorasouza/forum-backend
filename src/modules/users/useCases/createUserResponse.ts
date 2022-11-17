import { Failure } from "../core/failure";
import { Success } from "../core/success";

export type CreateUserResponse = Success<string> | Failure<string>;
