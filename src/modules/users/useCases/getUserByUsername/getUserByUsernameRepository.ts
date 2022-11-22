import { InconsistentDataFailure } from "../../adapters/sequelize/sequelizeUserFailures";
import { Success } from "../../core/success";
import { UserModel } from "../../domain/userModel";
import { UserNotFoundFailure } from "../failures/userNotFoundFailure";

export type GetByUsernameResponse =
  | UserNotFoundFailure
  | InconsistentDataFailure
  | Success<UserModel>;

export interface GetUserByUsernameRepository {
  getByUsername(username: string): Promise<GetByUsernameResponse>;
}
