import { Failure } from "../core/failure";
import { Success } from "../core/success";
import { UserModel } from "../domain/userModel";
import { UserNotFoundFailure } from "./createUserFailures";

export type saveResponse = Failure<string> | Success<string>;
export type GetUserByEmailResponse = UserNotFoundFailure | Success<UserModel>;

export interface CreateUserRepository {
  save(user: UserModel): Promise<saveResponse>;
  getUserByEmail(email: string): Promise<GetUserByEmailResponse>;
}
