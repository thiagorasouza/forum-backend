import { InconsistentDataFailure } from "../../adapters/sequelize/sequelizeUserFailures";
import { Failure } from "../../core/failure";
import { Success } from "../../core/success";
import { UserModel } from "../../domain/userModel";
import { UserNotFoundFailure } from "../shared/failures/userNotFoundFailure";

export type CreateResponse = Failure<string> | Success<string>;
export type GetByEmailResponse =
  | UserNotFoundFailure
  | InconsistentDataFailure
  | Success<UserModel>;

export interface CreateUserRepository {
  create(user: UserModel): Promise<CreateResponse>;
  getByEmail(email: string): Promise<GetByEmailResponse>;
}
