import { UserModel } from "../../domain/userModel";
import { UserNotFoundFailure } from "../shared/failures/userNotFoundFailure";
import { UserFoundSuccess } from "../shared/successes/userFoundSuccess";
import { UserCreatedSuccess } from "../shared/successes/userCreatedSuccess";

export type CreateResponse = UserCreatedSuccess;
export type GetByEmailResponse = UserNotFoundFailure | UserFoundSuccess;

export interface CreateUserRepository {
  create(user: UserModel): Promise<CreateResponse>;
  getByEmail(email: string): Promise<GetByEmailResponse>;
}
