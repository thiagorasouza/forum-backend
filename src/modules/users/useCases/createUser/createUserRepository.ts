import { Failure } from "../../core/failure";
import { Success } from "../../core/success";
import { UserModel } from "../../domain/userModel";
import { UserNotFoundFailure } from "./createUserFailures";

export type SaveResponse = Failure<string> | Success<string>;
export type GetByEmailResponse = UserNotFoundFailure | Success<UserModel>;

export interface CreateUserRepository {
  create(user: UserModel): Promise<SaveResponse>;
  getByEmail(email: string): Promise<GetByEmailResponse>;
}
