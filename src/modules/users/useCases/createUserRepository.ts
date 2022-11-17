import { Failure } from "../core/failure";
import { Success } from "../core/success";

export interface UserModel {
  email: string;
  password: string;
}

export type GetUserByEmailResponse = Failure<string> | Success<UserModel>;

export interface CreateUserRepository {
  getUserByEmail(email: string): Promise<GetUserByEmailResponse>;
}
