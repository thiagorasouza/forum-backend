import { Success } from "../../core/success";
import { UserFailures } from "../../domain/userFailures";
import { EmailAlreadyRegisteredFailure } from "../shared/failures/emailAlreadyRegisteredFailure";

export type CreateUserResponseModel =
  | Success<string>
  | EmailAlreadyRegisteredFailure
  | UserFailures;
