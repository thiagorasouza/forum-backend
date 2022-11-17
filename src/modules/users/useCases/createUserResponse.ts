import { Success } from "../core/success";
import { EmailAlreadyRegisteredFailure } from "./createUserFailures";

export type CreateUserResponse =
  | Success<string>
  | EmailAlreadyRegisteredFailure;
