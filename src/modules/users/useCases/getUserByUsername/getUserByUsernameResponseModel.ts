import { Success } from "../../core/success";
import { UserFailures } from "../../domain/userFailures";
import { UserModel } from "../../domain/userModel";
import { UserNotFoundFailure } from "../failures/userNotFoundFailure";

export type GetUserByUsernameResponseModel =
  | Success<UserModel>
  | UserNotFoundFailure
  | UserFailures;