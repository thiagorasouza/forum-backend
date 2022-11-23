import { InconsistentDataFailure } from "../shared/failures/inconsistentDataFailure";
import { Failure } from "../../core/failure";
import { Success } from "../../core/success";
import { UserModel } from "../../domain/userModel";
import { UserNotFoundFailure } from "../shared/failures/userNotFoundFailure";
import { UserFoundSuccess } from "../shared/successes/userFoundSuccess";

export type CreateResponse = Failure<string> | Success<string>;
export type GetByEmailResponse =
  | UserNotFoundFailure
  | InconsistentDataFailure
  | UserFoundSuccess;

export interface CreateUserRepository {
  create(user: UserModel): Promise<CreateResponse>;
  getByEmail(email: string): Promise<GetByEmailResponse>;
}
