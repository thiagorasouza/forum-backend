import { InconsistentDataFailure } from "../shared/failures/inconsistentDataFailure";
import { UserNotFoundFailure } from "../shared/failures/userNotFoundFailure";
import { UserFoundSuccess } from "../shared/successes/userFoundSuccess";

export type GetByUsernameResponse =
  | UserNotFoundFailure
  | InconsistentDataFailure
  | UserFoundSuccess;

export interface GetUserByUsernameRepository {
  getByUsername(username: string): Promise<GetByUsernameResponse>;
}
