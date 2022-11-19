import { Success } from "../../core/success";
import { UserFailures } from "../../domain/userFailures";
import { EmailAlreadyRegisteredFailure } from "./createUserFailures";

export type CreateUserResponseModel =
  | Success<string>
  | EmailAlreadyRegisteredFailure
  | UserFailures;