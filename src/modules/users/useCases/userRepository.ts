import { Result } from "../core/result";

export interface UserModel {
  email: string;
  password: string;
}

export type GetUserByEmailResponse = Result<void> | Result<UserModel>;

export interface UserRepository {
  getUserByEmail(email: string): Promise<GetUserByEmailResponse>;
}
