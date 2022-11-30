import { UserNotFoundFailure } from "../shared/failures/userNotFoundFailure";
import { UserFoundSuccess } from "../shared/successes/userFoundSuccess";

export type GetByEmailResponse = UserNotFoundFailure | UserFoundSuccess;

export interface LoginUserRepository {
  getByEmail(email: string): Promise<GetByEmailResponse>;
}
